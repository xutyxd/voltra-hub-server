import { EntityModel } from "../../crosscutting/common/classes";
import { IIndicatorData, IIndicatorModelData } from "../interfaces/data";
import { IIndicatorModel } from "../interfaces/dto";

export class IndicatorModel extends EntityModel implements IIndicatorModel {

    public indicator_id;
    public date;
    public geos;
    public values;
    public updated_esios;
    public raw;

    constructor(data: IIndicatorModelData) {
        super(data);

        this.indicator_id = data.indicator_id;
        this.date = data.date;
        this.geos = data.geos;
        this.values = data.values;
        this.updated_esios = data.updated_esios;
        this.raw = data.raw;
    }

    public toDomain() {
        const base = super.toDomain();

        return {
            ...base,
            indicatorId: this.indicator_id,
            date: this.date,
            geos: this.geos,
            values: this.values,
            updatedESIOS: this.updated_esios,
            raw: this.raw
        };
    }

    public toRepository() {
        const base = super.toRepository();

        return {
            ...base,
            indicator_id: this.indicator_id,
            date: this.date,
            geos: this.geos,
            values: this.values,
            updated_esios: this.updated_esios,
            raw: this.raw
        };
    }

    public static fromDomain(entity: IIndicatorData) {
        const base = super.fromDomain(entity);

        return new IndicatorModel({
            ...base,
            indicator_id: entity.indicatorId,
            date: entity.date,
            geos: entity.geos,
            values: entity.values,
            updated_esios: entity.updatedESIOS,
            raw: entity.raw
        });
    }

    public static fromRepository(entity: IIndicatorModelData) {
        const base = super.fromRepository(entity);

        return new IndicatorModel({
            ...base,
            indicator_id: entity.indicator_id,
            date: entity.date,
            geos: entity.geos,
            values: entity.values,
            updated_esios: entity.updated_esios,
            raw: entity.raw
        });
    }
}
