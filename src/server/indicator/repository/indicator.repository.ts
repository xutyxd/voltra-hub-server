import { inject, injectable } from "inversify";
import { EntityRepositoryService } from "../../crosscutting/common/services";
import { IDatabase } from "../../crosscutting/database/interfaces";
import { IndicatorModel } from "../classes";
import { IIndicatorData, IIndicatorModelData } from "../interfaces/data";

@injectable()
export class IndicatorRepository extends EntityRepositoryService<IIndicatorData, IIndicatorModelData> {

    constructor(@inject('IDatabase') readonly dataBaseService: IDatabase<IIndicatorModelData>) {
        const table = 'indicator';
        super(dataBaseService, table, IndicatorModel);
    }
}
