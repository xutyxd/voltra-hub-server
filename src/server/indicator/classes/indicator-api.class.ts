import { EntityAPI } from "../../crosscutting/common/classes";
import { IIndicatorAPIData, IIndicatorData } from "../interfaces/data";
import { IIndicatorAPI } from "../interfaces/dto";

export class IndicatorAPI extends EntityAPI implements IIndicatorAPI {
    
    public propertyA;

    constructor(data: IIndicatorAPIData) {
        super(data);

        this.propertyA = data.propertyA;
    }

    public toApi() {
        const base = super.toApi();

        return {
            ...base,
            propertyA: this.propertyA
        };
    }

    public toDomain() {
        const base = super.toDomain();

        return {
            ...base,
            propertyA: this.propertyA
        };
    }

    public static fromDomain(entity: IIndicatorData) {
        return new IndicatorAPI({ ...entity });
    }
}
