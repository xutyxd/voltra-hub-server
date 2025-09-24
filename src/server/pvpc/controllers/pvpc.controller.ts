import { inject, injectable } from 'inversify';

import { HttpMethodEnum, HTTPRequest, IHTTPContextData, IHTTPController, IHTTPControllerHandler } from 'server-over-express';

import { EntityController } from '../../crosscutting/common';
import { BadRequestResponse, InternalErrorResponse } from '../../crosscutting/common/responses';
import { DbWhereOperands } from '../../crosscutting/database/enums/db-where-operands.enum';
import { BaseError } from '../../crosscutting/common/errors';
import { isValidISODate } from '../../crosscutting/common/functions/date.function';

import { IPVPCAPIData, IPVPCData, IPVPCModelData } from '../interfaces/data';
import { PVPCService } from '../services/pvpc.service';
import { PVPCAPI } from '../classes';


@injectable()
export class PVPCController extends EntityController<IPVPCAPIData, IPVPCData, IPVPCModelData> implements IHTTPController {

    public path = 'pvpc';

    public handlers: IHTTPControllerHandler<IPVPCAPIData>[] = [
        {
            path: { method: HttpMethodEnum.GET },
            action: this.get.bind(this) // IMPORTANT: Bind this to the controller
        }
    ]

    constructor(@inject(PVPCService) readonly pvpcService: PVPCService) {
        const schemas = {
            base: Object,
            create: Object,
            update: Object,
            ref: '#/components/schemas/pvpc-base.request'
        };

        super(pvpcService, schemas, PVPCAPI);
    }

    public async get(request: HTTPRequest, context: IHTTPContextData) {
        const { date } = request.query;

        if (!date || typeof date !== 'string' || !isValidISODate(date)) {
            throw new BadRequestResponse('Invalid date property', context);
        }
        let pvpc: IPVPCData;
        try {
            // Get first one, there should only be one
            const [ pvpcFound ] = await this.pvpcService.list([{ A: 'date', op: DbWhereOperands.EQUALS, B: date }], context);
            // Transform to API
            pvpc = pvpcFound;
        } catch (error) {
            if (error instanceof BaseError) {
                throw error;
            }

            throw new InternalErrorResponse('Error getting PVPC', context);
        }
        // Transform to API
        const transformed = PVPCAPI.fromDomain(pvpc);
        // Return it
        return transformed;
    }
}
