import { inject, injectable } from "inversify";

import { IHTTPContextData } from "server-over-express";
import { ESIOSApiClient } from "esios-api-client";

import { EntityService } from "../../crosscutting/common/services";
import { IDbQueryWhere } from "../../crosscutting/database/interfaces";

import { PVPC } from "../classes/pvpc.class";
import { IPVPCAPIData, IPVPCData, IPVPCModelData } from "../interfaces/data";
import { PVPCRepository } from "../repository/pvpc.repository";
@injectable()
export class PVPCService extends EntityService<IPVPCAPIData, IPVPCData, IPVPCModelData> {

    private readonly esiosApiClient = new ESIOSApiClient();

    constructor(@inject(PVPCRepository) readonly pvpcRepository: PVPCRepository) {
        super(pvpcRepository, PVPC);
    }

    public async list(where: IDbQueryWhere<IPVPCModelData>[], context?: IHTTPContextData): Promise<IPVPCData[]> {
        // Find all the dates with query
        const dates = await super.list(where, context);
        // Get all not found to add to DB
        const notFound = where.filter(({ A }) => A === 'date').map(({ B }) => B as string);
        // Get all the dates not found
        const datesNotFound = notFound.filter((date) => dates.findIndex(({ date: dateFound }) => dateFound === date) === -1);
        // Get all the dates with not found from ESIOS
        const esiosDates = await Promise.all(datesNotFound.map(async (date) => {
            // Get the date from ESIOS
            const pvpc = await this.esiosApiClient.archives.pvpc(new Date(date));
            // Return the date
            return pvpc;
        }));
        // Save on DB
        const inserted = await Promise.all(esiosDates.map(async (pvpc) => {
            // Instance domain class
            const instanced = PVPC.fromESIOS(pvpc);
            // Transform to model
            const modeled = instanced.toModel();
            // Insert to DB
            const inserted = await this.pvpcRepository.insert(modeled);
            // Transform to domain
            const domain = PVPC.fromModel(inserted);
            // Return the domain
            return domain.toDomain();
        }));
        // Return the dates with not found
        return dates.concat(inserted);
    }
}
