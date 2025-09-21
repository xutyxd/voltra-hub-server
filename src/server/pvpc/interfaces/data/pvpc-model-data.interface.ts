import { IPVPCHourNormalized } from "esios-api-client";
import { IEntityModelData } from "../../../crosscutting/common/interfaces/data";

export interface IPVPCModelData extends IEntityModelData {
    date: string;
    general: IPVPCHourNormalized[];
    special: IPVPCHourNormalized[];
}
