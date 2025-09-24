import { IEntityData } from "../../../crosscutting/common/interfaces/data";
import { IPVPCHourNormalized, PVPCDay } from "esios-api-client";

export interface IPVPCData extends IEntityData {
    date: string;
    general: IPVPCHourNormalized[];
    special: IPVPCHourNormalized[];
    raw: InstanceType<typeof PVPCDay>;
}
