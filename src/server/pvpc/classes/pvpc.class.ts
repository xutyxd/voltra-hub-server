import { PVPCDay, PVPCDayZoned } from "esios-api-client";
import { Entity } from "../../crosscutting/common/classes";
import { IPVPCAPIData, IPVPCData, IPVPCModelData } from "../interfaces/data";
import { IPVPC } from "../interfaces/dto";

export class PVPC extends Entity implements IPVPC {

    public date: string;
    public general: PVPCDayZoned;
    public special: PVPCDayZoned;

    constructor(data: Partial<IPVPCData>) {
        super(data);

        if (!data.date) {
            throw new Error('Date is required');
        }

        if (!data.general) {
            throw new Error('General PVPC information is required');
        }

        if (!data.special) {
            throw new Error('Special PVPC is required');
        }

        this.date = data.date;
        this.general = new PVPCDayZoned(data.general);
        this.special = new PVPCDayZoned(data.special);
    }

    public toApi() {
        const base = super.toApi();

        return {
            ...base,
            date: this.date,
            general: {
                hours: this.general.hours.map((hour) => {
                    return {
                        date: hour.day.toISOString(),
                        hour: hour.hour,
                        price: hour.price
                    };
                }),
                min: {
                    date: this.general.min.day.toISOString(),
                    hour: this.general.min.hour,
                    price: this.general.min.price
                },
                max: {
                    date: this.general.max.day.toISOString(),
                    hour: this.general.max.hour,
                    price: this.general.max.price
                },
                average: this.general.average
            },
            special: {
                hours: this.special.hours.map((hour) => {
                    return {
                        date: hour.day.toISOString(),
                        hour: hour.hour,
                        price: hour.price
                    };
                }),
                min: {
                    date: this.special.min.day.toISOString(),
                    hour: this.special.min.hour,
                    price: this.special.min.price
                },
                max: {
                    date: this.special.max.day.toISOString(),
                    hour: this.special.max.hour,
                    price: this.special.max.price
                },
                average: this.special.average
            }
        };
    }

    public toDomain() {
        const base = super.toDomain();

        return {
            ...base,
            date: this.date,
            general: this.general.hours.map(({ raw }) => raw),
            special: this.special.hours.map(({ raw }) => raw),
        };
    }

    public toModel() {
        const base = super.toModel();

        return {
            ...base,
            date: this.date,
            general: this.general.hours.map(({ raw }) => raw),
            special: this.special.hours.map(({ raw }) => raw),
        };
    }

    public static fromAPI(entity: IPVPCAPIData): PVPC {
        throw new Error('Forbidden');
    }

    public static fromESIOS(pvpcDay: PVPCDay) {
        const year = pvpcDay.date.getFullYear();
        const month = `${(pvpcDay.date.getMonth() + 1)}`.padStart(2, '0');
        const day = pvpcDay.date.getDate();

        return new PVPC({
            date: `${year}-${month}-${day}`,
            general: pvpcDay.general.hours.map(({ raw }) => {
                const [year, month, day] = raw.day.split('-');
                return {
                    ...raw,
                    day: [day, month, year].join('/')
                };
            }),
            special: pvpcDay.special.hours.map(({ raw }) => {
                const [year, month, day] = raw.day.split('-');
                return {
                    ...raw,
                    day: [day, month, year].join('/')
                };
            }),
        });
    }

    public static fromModel(entity: IPVPCModelData) {
        const base = super.fromModel(entity);

        return new PVPC({
            ...base,
            date: entity.date,
            general: entity.general.map((hour) => {
                const [year, month, day] = hour.day.split('-');
                return {
                    ...hour,
                    day: [day, month, year].join('/')
                };
            }),
            special: entity.special.map((hour) => {
                const [year, month, day] = hour.day.split('-');
                return {
                    ...hour,
                    day: [day, month, year].join('/')
                };
            }),
        });
    }
}
