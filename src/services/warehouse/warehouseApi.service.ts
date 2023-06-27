import { Injectable } from '@nestjs/common';
import got, { Got } from 'got';
import { z, ZodSchema } from 'zod';

import config from '../../config';
import { ProductPositionResponse } from './warehouse.interfaces';

const productPositionSchema: ZodSchema<ProductPositionResponse> = z.array(
    z.object({
        positionId: z.string().min(1),
        x: z.number().int().min(0),
        y: z.number().int().min(0),
        z: z.number().int().min(0),
        productId: z.string().min(1),
        quantity: z.number().int().min(1),
    }),
);

@Injectable()
export class WarehouseApiService {
    private client: Got;

    constructor() {
        this.client = got.extend({
            prefixUrl: config.externalService.url,
            headers: {
                'x-api-key': config.externalService.apiKey,
            },
        });
    }

    public async getProductPositions(productId: string): Promise<ProductPositionResponse> {
        const response = await this.client.get<ProductPositionResponse>(`case-study/products/${productId}/positions`, {
            responseType: 'json',
        });

        const result = productPositionSchema.parse(response.body);

        return result;
    }
}
