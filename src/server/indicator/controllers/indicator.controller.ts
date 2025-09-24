import { inject, injectable } from 'inversify';

import { HttpMethodEnum, HTTPRequest, IHTTPContextData, IHTTPController, IHTTPControllerHandler } from 'server-over-express';

import { EntityController } from '../../crosscutting/common';
import { BadRequestResponse, InternalErrorResponse } from '../../crosscutting/common/responses';
import { BaseError } from '../../crosscutting/common/errors';

import { isValidISODate } from '../../crosscutting/common/functions/date.function';

import { IIndicatorAPIData, IIndicatorData, IIndicatorModelData } from '../interfaces/data';
import { IndicatorService } from '../services/indicator.service';
import { IndicatorAPI } from '../classes';

@injectable()
export class IndicatorController extends EntityController<IIndicatorAPIData, IIndicatorData, IIndicatorModelData> implements IHTTPController {

    public path = 'indicator';

    public handlers: IHTTPControllerHandler<IIndicatorAPIData>[] = [
        {
            path: { 
                method: HttpMethodEnum.GET,
                relative: '/pvpc'
            },
            action: this.pvpc.bind(this) // IMPORTANT: Bind this to the controller
        },
        {
            path: { 
                method: HttpMethodEnum.GET,
                relative: '/spot'
            },
            action: this.spot.bind(this) // IMPORTANT: Bind this to the controller
        }
    ]

    constructor(@inject(IndicatorService) readonly indicatorService: IndicatorService) {
        const schemas = {
            base: Object,
            create: Object,
            update: Object,
            ref: '#/components/schemas/indicator-base.request'
        };

        super(indicatorService, schemas, IndicatorAPI);
    }

    public async pvpc(request: HTTPRequest, context: IHTTPContextData) {
        const { date } = request.query;

        if (!date || typeof date !== 'string' || !isValidISODate(date)) {
            throw new BadRequestResponse('Invalid date property', context);
        }
        let indicator: IIndicatorData;
        try {
            // Get first one, there should only be one
            const indicatorFound = await this.indicatorService.pvpc(date);
            // Transform to API
            indicator = indicatorFound;
        } catch (error) {
            if (error instanceof BaseError) {
                throw error;
            }

            throw new InternalErrorResponse('Error getting indicator', context);
        }
        // Transform to API
        const transformed = IndicatorAPI.fromDomain(indicator);
        // Return it
        return transformed;
    }

    public async spot(request: HTTPRequest, context: IHTTPContextData) {
        const { date } = request.query;

        if (!date || typeof date !== 'string' || !this.isValidISODate(date)) {
            throw new BadRequestResponse('Invalid date property', context);
        }
        let indicator: IIndicatorData;
        try {
             // Get first one, there should only be one
             const indicatorFound = await this.indicatorService.spot(date);
             // Transform to API
             indicator = indicatorFound;
        } catch (error) {
            if (error instanceof BaseError) {
                throw error;
            }

            throw new InternalErrorResponse('Error getting indicator', context);
        }
        // Transform to API
        const transformed = IndicatorAPI.fromDomain(indicator);
        // Return it
        return transformed;
    }
}
