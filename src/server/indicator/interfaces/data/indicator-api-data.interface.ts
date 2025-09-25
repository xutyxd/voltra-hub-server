import { IEntityAPIData } from "../../../crosscutting/common/interfaces/data";

export interface IIndicatorAPIData extends IEntityAPIData {
    geos: number[];
    values: {
        value: number;
        dates: {
            utc: string;
            local: string;
        };
        geo: number;
    }[],
    updatedESIOS: string;
}
