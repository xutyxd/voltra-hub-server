import { PVPCDayZoned } from "esios-api-client";
import { EntityAPI } from "../../crosscutting/common/classes";
import { IPVPCAPIData, IPVPCData } from "../interfaces/data";
import { IPVPCAPI } from "../interfaces/dto";

export class PVPCAPI extends EntityAPI implements IPVPCAPI {
    
    public date;
    public general;
    public special;

    constructor(data: IPVPCAPIData) {
        super(data);

        this.date = data.date;
        this.general = data.general;
        this.special = data.special;
    }

    public toApi() {
        const base = super.toApi();

        return {
            ...base,
            date: this.date,
            general: this.general,
            special: this.special
        };
    }

    public toDomain(): IPVPCData {
        throw new Error('Forbidden');
    }

    public static fromDomain(entity: IPVPCData) {
        const general = new PVPCDayZoned(entity.general);
        const special = new PVPCDayZoned(entity.special);

        return new PVPCAPI({
            ...entity,
            date: entity.date,
            general: {
                hours: general.hours.map(({ day, hour, price }) => {
                    return {
                        date: day.toISOString(),
                        hour,
                        price
                    };
                }),
                min: {
                    date: general.min.day.toISOString(),
                    hour: general.min.hour,
                    price: general.min.price
                },
                max: {
                    date: general.max.day.toISOString(),
                    hour: general.max.hour,
                    price: general.max.price
                },
                average: general.average
            },
            special: {
                hours: special.hours.map(({ day, hour, price }) => {
                    return {
                        date: day.toISOString(),
                        hour,
                        price
                    };
                }),
                min: {
                    date: special.min.day.toISOString(),
                    hour: special.min.hour,
                    price: special.min.price
                },
                max: {
                    date: special.max.day.toISOString(),
                    hour: special.max.hour,
                    price: special.max.price
                },
                average: special.average
            }
        });
    }
}
