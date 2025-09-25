import { IndicatorID, Indicator as ESIOSIndicator } from "esios-api-client";
import { IEntityModelData } from "../../../crosscutting/common/interfaces/data";

export interface IIndicatorModelData extends IEntityModelData {
    indicator_id: IndicatorID;
    geos: number[];
    date: string;
    values: {
        value: number;
        dates: {
            utc: string;
            local: string;
        };
        geo: number;
    }[],
    updated_esios: string;
    raw: InstanceType<typeof ESIOSIndicator>;
}
