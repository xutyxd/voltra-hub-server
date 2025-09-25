import { EntityModel } from "../../crosscutting/common/classes";
import { IPVPCData, IPVPCModelData } from "../interfaces/data";
import { IPVPCModel } from "../interfaces/dto";

export class PVPCModel extends EntityModel implements IPVPCModel {

    public date;
    public general;
    public special;
    public raw;

    constructor(data: IPVPCModelData) {
        super(data);

        this.date = data.date;
        this.general = data.general;
        this.special = data.special;
        this.raw = data.raw;
    }

    public toDomain() {
        const base = super.toDomain();

        return {
            ...base,
            date: this.date,
            general: this.general,
            special: this.special,
            raw: this.raw
        };
    }

    public toRepository() {
        const base = super.toRepository();

        return {
            ...base,
            date: this.date,
            general: this.general,
            special: this.special,
            raw: this.raw
        };
    }

    public static fromDomain(entity: IPVPCData) {
        const base = super.fromDomain(entity);

        return new PVPCModel({
            ...base,
            date: entity.date,
            general: entity.general,
            special: entity.special,
            raw: entity.raw
        });
    }

    public static fromRepository(entity: IPVPCModelData) {
        const base = super.fromRepository(entity);

        return new PVPCModel({
            ...base,
            date: entity.date,
            general: entity.general,
            special: entity.special,
            raw: entity.raw
        });
    }
}
