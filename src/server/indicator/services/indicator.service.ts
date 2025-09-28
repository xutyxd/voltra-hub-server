import { inject, injectable } from "inversify";

import { ESIOSApiClient, IndicatorID, Geo } from "esios-api-client";

import { EntityService } from "../../crosscutting/common/services";
import { DbWhereOperands } from "../../crosscutting/database/enums/db-where-operands.enum";

import { Indicator } from "../classes/indicator.class";
import { IIndicatorAPIData, IIndicatorData, IIndicatorModelData } from "../interfaces/data";
import { IndicatorRepository } from "../repository/indicator.repository";
import { IDbQueryWhere } from "../../crosscutting/database/interfaces";

@injectable()
export class IndicatorService extends EntityService<IIndicatorAPIData, IIndicatorData, IIndicatorModelData> {

    private readonly esiosApiClient = new ESIOSApiClient();

    constructor(@inject(IndicatorRepository) readonly indicatorRepository: IndicatorRepository) {
        super(indicatorRepository, Indicator);
    }

    private async it(indicatorId: `${number}`, date: string, geo: Geo) {
        // Create query
        const where: IDbQueryWhere<IIndicatorModelData>[] = [
            {
                A: 'date',
                op: DbWhereOperands.EQUALS,
                B: date
            },
            {
                A: 'indicator_id',
                op: DbWhereOperands.EQUALS,
                B: Number(indicatorId)
            },
            {
                A: 'geos',
                op: DbWhereOperands.IN,
                B: geo
            }
        ];
        // Find all the dates with query
        const [ indicator ] = await super.list(where);
        // If found return it and stop execution
        if (indicator) {
            return indicator;
        }
        // Get the date from ESIOS
        const indicatorESIOS = await this.esiosApiClient.indicators.it(indicatorId, new Date(date), geo);
        // Instance domain class
        const instanced = Indicator.fromESIOS(indicatorESIOS);
        // Transform to model
        const modeled = instanced.toModel();
        // Insert to DB
        const inserted = await this.indicatorRepository.insert(modeled);
        // Transform to domain
        const domain = Indicator.fromModel(inserted);
        // Return the domain
        return domain.toDomain();
    }

    public async pvpc(date: string) {
        return this.it(IndicatorID.PVPC, date, Geo.PENINSULA);
    }

    public async spot(date: string) {
        return this.it(IndicatorID.SPOT, date, Geo.ES);
    }
}
