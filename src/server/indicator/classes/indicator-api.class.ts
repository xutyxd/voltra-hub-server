import { EntityAPI } from "../../crosscutting/common/classes";
import { IIndicatorAPIData, IIndicatorData } from "../interfaces/data";
import { IIndicatorAPI } from "../interfaces/dto";

export class IndicatorAPI extends EntityAPI implements IIndicatorAPI {
    
    public geos;
    public values;
    public updatedESIOS;

    constructor(data: IIndicatorAPIData) {
        super(data);

        this.geos = data.geos;
        this.values = data.values;
        this.updatedESIOS = data.updatedESIOS;
    }

    public toApi() {
        const base = super.toApi();

        return {
            ...base,
            geos: this.geos,
            values: this.values,
            updatedESIOS: this.updatedESIOS,
        };
    }

    public toDomain(): IIndicatorData {
        throw new Error('Forbidden');
    }

    public static fromDomain(entity: IIndicatorData) {
        return new IndicatorAPI({ ...entity });
    }
}
