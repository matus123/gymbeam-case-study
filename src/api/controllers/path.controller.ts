import { Body, Controller, HttpCode, Post, UseFilters } from '@nestjs/common';
import { z, ZodSchema } from 'zod';

import { PathfindingService } from '../../services/pathfinding/pathfinding.service';
import { ProductGroup } from '../../services/pathfinding/productPositionGroup';
import { WarehouseService } from '../../services/warehouse/warehouse.service';
import { ValidationHttpException, ValidationHttpExceptionFilter } from '../errorHandling';

export class OptimizePathBody {
    startPosition!: {
        x: number;
        y: number;
        z: number;
    };
    products!: string[];
}

const optimizePathInputParametersSchema: ZodSchema<OptimizePathBody> = z.object({
    startPosition: z.object({
        x: z.number().int().min(0),
        y: z.number().int().min(0),
        z: z.number().int().min(0),
    }),
    products: z.array(z.string().min(1)).min(1),
});

interface OptimizePathResponse {
    pickingOrder: { productId: string; positionId: string }[];
    distance: number;
}

@Controller('/')
@UseFilters(new ValidationHttpExceptionFilter())
export class PathController {
    constructor(private warehouseService: WarehouseService, private pathfindingService: PathfindingService) {}

    @Post('optimize-path')
    @HttpCode(200)
    async optimizePath(@Body() body: OptimizePathBody): Promise<OptimizePathResponse> {
        const inputParams = this.parseParameters(body);

        const productPositionsGroup = await this.warehouseService.getProductPositions(inputParams.products);

        const shortestPath = this.pathfindingService.findShortestPath({
            startPosition: inputParams.startPosition,
            products: inputParams.products,
            productPositionsGroup: new ProductGroup(productPositionsGroup),
        });

        return {
            pickingOrder: shortestPath.path,
            distance: shortestPath.distance,
        };
    }

    private parseParameters(inputParameters: unknown) {
        const result = optimizePathInputParametersSchema.safeParse(inputParameters);
        if (result.success) {
            return result.data;
        } else {
            throw new ValidationHttpException({
                message: 'Invalid query parameters',
                errorCode: 'invalid_query_parameters',
                errors: result.error.issues,
            });
        }
    }
}
