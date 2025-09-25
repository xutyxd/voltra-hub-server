import { IndicatorID, Indicator as ESIOSIndicator } from "esios-api-client";
import { IEntityData } from "../../../crosscutting/common/interfaces/data";

export interface IIndicatorData extends IEntityData {
    indicatorId: IndicatorID;
    date: string;
    geos: number[];
    values: { value: number, dates: { utc: string, local: string }, geo: number  }[];
    updatedESIOS: string;
    raw: InstanceType<typeof ESIOSIndicator>;
}
