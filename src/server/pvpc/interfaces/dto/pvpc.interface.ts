import { IEntity } from "../../../crosscutting/common/interfaces/dto";
import { IPVPCAPIData, IPVPCData, IPVPCModelData } from "../data";

export interface IPVPC extends IEntity<IPVPCAPIData, IPVPCData, IPVPCModelData> { }
