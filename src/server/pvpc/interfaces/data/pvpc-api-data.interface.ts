import { IEntityAPIData } from "../../../crosscutting/common/interfaces/data";

export interface IPVPCAPIData extends IEntityAPIData {
    date: string;
    general: {
        hours: { date: string, hour: number, price: number }[];
        min: { date: string, hour: number, price: number };
        max: { date: string, hour: number, price: number };
        average: number;
    };
    special: {
        hours: { date: string, hour: number, price: number }[];
        min: { date: string, hour: number, price: number };
        max: { date: string, hour: number, price: number };
        average: number;
    }
    
}
