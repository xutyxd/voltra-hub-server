import { Container } from "inversify";

import { IndicatorController } from "./controllers/indicator.controller";
import { IndicatorRepository } from "./repository/indicator.repository";
import { IndicatorService } from "./services/indicator.service";

const IndicatorContainer = new Container();

IndicatorContainer.bind<IndicatorController>(IndicatorController).toSelf();
IndicatorContainer.bind<IndicatorService>(IndicatorService).toSelf();
IndicatorContainer.bind<IndicatorRepository>(IndicatorRepository).toSelf();

export { IndicatorContainer, IndicatorController };
