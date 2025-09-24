import { EntityModel } from "../../crosscutting/common/classes";
import { IIndicatorData, IIndicatorModelData } from "../interfaces/data";
import { IIndicatorModel } from "../interfaces/dto";

export class IndicatorModel extends EntityModel implements IIndicatorModel {

    public property_a;

    constructor(data: IIndicatorModelData) {
        super(data);

        this.property_a = data.property_a;
    }

    public toDomain() {
        const base = super.toDomain();

        return {
            ...base,
            propertyA: this.property_a
        };
    }

    public toRepository() {
        const base = super.toRepository();

        return {
            ...base,
            property_a: this.property_a
        };
    }

    public static fromDomain(entity: IIndicatorData) {
        const base = super.fromDomain(entity);

        return new IndicatorModel({
            ...base,
            property_a: entity.propertyA
        });
    }

    public static fromRepository(entity: IIndicatorModelData) {
        const base = super.fromRepository(entity);

        return new IndicatorModel({
            ...base,
            property_a: entity.property_a
        });
    }
}
