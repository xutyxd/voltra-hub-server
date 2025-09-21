import { inject, injectable } from "inversify";
import { EntityRepositoryService } from "../../crosscutting/common/services";
import { IDatabase } from "../../crosscutting/database/interfaces";
import { PVPCModel } from "../classes";
import { IPVPCData, IPVPCModelData } from "../interfaces/data";

@injectable()
export class PVPCRepository extends EntityRepositoryService<IPVPCData, IPVPCModelData> {

    constructor(@inject('IDatabase') readonly dataBaseService: IDatabase<IPVPCModelData>) {
        const table = 'pvpc';
        super(dataBaseService, table, PVPCModel);
    }
}
