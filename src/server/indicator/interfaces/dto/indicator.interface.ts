import { IEntity } from "../../../crosscutting/common/interfaces/dto";
import { IIndicatorAPIData, IIndicatorData, IIndicatorModelData } from "../data";

export interface IIndicator extends IEntity<IIndicatorAPIData, IIndicatorData, IIndicatorModelData> { }
