import { IEntityData } from "../../../crosscutting/common/interfaces/data";
import { IPVPCHourNormalized } from "esios-api-client";

export interface IPVPCData extends IEntityData {
    date: string;
    general: IPVPCHourNormalized[];
    special: IPVPCHourNormalized[];
}
