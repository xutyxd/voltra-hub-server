import { Indicator as ESIOSIndicator, IndicatorID } from "esios-api-client";

import { Entity } from "../../crosscutting/common/classes";
import { IIndicatorAPIData, IIndicatorData, IIndicatorModelData } from "../interfaces/data";
import { IIndicator } from "../interfaces/dto";

export class Indicator extends Entity implements IIndicator {

    public indicatorId;
    public geos;
    public values;
    public updatedESIOS;
    public raw: InstanceType<typeof ESIOSIndicator>;

    constructor(data: Partial<IIndicatorData>) {
        super(data);
        
        if (!data.indicatorId) {
            throw new Error('Indicator ID is required');
        }

        if (!data.geos) {
            throw new Error('Geos is required');
        }

        if (!data.values) {
            throw new Error('Values is required');
        }

        if (!data.updatedESIOS) {
            throw new Error('Updated ESIOS is required');
        }

        if (!data.raw) {
            throw new Error('Raw indicator is required');
        }

        this.indicatorId = data.indicatorId;
        this.geos = data.geos;
        this.values = data.values;
        this.updatedESIOS = data.updatedESIOS;
        this.raw = data.raw;
    }

    public toApi() {
        const base = super.toApi();

        return {
            ...base,
            geos: this.geos,
            values: this.values,
            updatedESIOS: this.updatedESIOS
        };
    }

    public toDomain() {
        const base = super.toDomain();

        return {
            ...base,
            indicatorId: this.indicatorId,
            geos: this.geos,
            values: this.values,
            updatedESIOS: this.updatedESIOS,
            raw: this.raw
        };
    }

    public toModel() {
        const base = super.toModel();

        return {
            ...base,
            indicator_id: this.indicatorId,
            geos: this.geos,
            values: this.values,
            updated_esios: this.updatedESIOS,
            raw: this.raw
        };
    }

    public static fromAPI(entity: IIndicatorAPIData) {
        throw new Error('Forbidden');
    }

    public static fromESIOS(indicator: ESIOSIndicator) {
        return new Indicator({
            indicatorId: ('' + indicator.id) as IndicatorID,
            geos: indicator.geos.map(({ id }) => id),
            values: indicator.values.map(({ value, dates, geo }) => {
                return {
                    value,
                    dates: {
                        utc: dates.utc,
                        local: dates.local,
                        geo
                    }
                };
            }),
            updatedESIOS: indicator.updatedAt,
            raw: indicator
        });
    }

    public static fromModel(entity: IIndicatorModelData) {
        const base = super.fromModel(entity);

        return new Indicator({
            ...base,
            indicatorId: entity.indicator_id,
            geos: entity.geos,
            values: entity.values,
            updatedESIOS: entity.updated_esios,
            raw: entity.raw
        });
    }
}
