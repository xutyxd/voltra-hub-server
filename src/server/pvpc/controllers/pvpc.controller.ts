import { inject, injectable } from 'inversify';
import { HttpMethodEnum, HTTPRequest, IHTTPContextData, IHTTPController, IHTTPControllerHandler } from 'server-over-express';
import { EntityController } from '../../crosscutting/common';
import { IPVPCAPIData, IPVPCData, IPVPCModelData } from '../interfaces/data';
import { PVPCService } from '../services/pvpc.service';
import { PVPCAPI } from '../classes';
import { BadRequestResponse } from '../../crosscutting/common/responses';
import { DbWhereOperands } from '../../crosscutting/database/enums/db-where-operands.enum';

@injectable()
export class PVPCController extends EntityController<IPVPCAPIData, IPVPCData, IPVPCModelData> implements IHTTPController {

    public path = 'pvpc';

    public handlers: IHTTPControllerHandler<IPVPCAPIData | IPVPCAPIData[]>[] = [
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

    private isValidISODate(stringDate: unknown): boolean {
        // Check it is a string
        if (typeof stringDate !== 'string') {
            return false;
        }
        // Must match YYYY-MM-DD
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        if (!regex.test(stringDate)) {
            return false;
        }
        const [year, month, day] = stringDate.split("-").map(Number);
        // JS months are 0-based: 0 = Jan, 11 = Dec
        const date = new Date(year, month - 1, day);
      
        // Check if date components match exactly
        return (
          date.getFullYear() === year &&
          date.getMonth() === month - 1 &&
          date.getDate() === day
        );
    }

    public async get(request: HTTPRequest, context: IHTTPContextData) {
        const { date } = request.query;

        if (!date || typeof date !== 'string' || !this.isValidISODate(date)) {
            throw new BadRequestResponse('Invalid date property', context);
        }
        // Get first one, there should only be one
        const [ pvpc ] = await this.pvpcService.list([{ A: 'date', op: DbWhereOperands.EQUALS, B: date }], context);
        // Transform to API
        const transformed = PVPCAPI.fromDomain(pvpc);
        // Return it
        return transformed;
    }
}
