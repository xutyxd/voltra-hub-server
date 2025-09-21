import { Container } from "inversify";

import { PVPCController } from "./controllers/pvpc.controller";
import { PVPCRepository } from "./repository/pvpc.repository";
import { PVPCService } from "./services/pvpc.service";

const PVPCContainer = new Container();

PVPCContainer.bind<PVPCController>(PVPCController).toSelf();
PVPCContainer.bind<PVPCService>(PVPCService).toSelf();
PVPCContainer.bind<PVPCRepository>(PVPCRepository).toSelf();

export { PVPCContainer, PVPCController };
