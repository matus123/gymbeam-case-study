import { Injectable } from '@nestjs/common';

import { ProductPositionMappedItem, ProductPositionResponse } from './warehouse.interfaces';
import { WarehouseApiService } from './warehouseApi.service';

@Injectable()
export class WarehouseService {
    private type: 'parallel' | 'sequential' = 'sequential';

    constructor(private warehouseApiService: WarehouseApiService) {}

    public async getProductPositions(productIds: string[]): Promise<ProductPositionMappedItem[]> {
        const uniqueProductIds = [...new Set(productIds)];

        return this.type === 'sequential'
            ? await this.sequentialGetProductPositions(uniqueProductIds)
            : await this.parallelGetProductPositions(uniqueProductIds);
    }

    private async sequentialGetProductPositions(productIds: string[]): Promise<ProductPositionMappedItem[]> {
        const finalProductPositions: ProductPositionMappedItem[] = [];
        for (const productId of productIds) {
            const productPositions = await this.warehouseApiService.getProductPositions(productId);
            finalProductPositions.push(this.mapProductPositions(productId, productPositions));
        }

        return finalProductPositions;
    }

    private async parallelGetProductPositions(productIds: string[]): Promise<ProductPositionMappedItem[]> {
        const productPositions: ProductPositionMappedItem[] = await Promise.all(
            productIds.map(async (productId) => {
                const productPositions = await this.warehouseApiService.getProductPositions(productId);
                return this.mapProductPositions(productId, productPositions);
            }),
        );

        return productPositions;
    }

    private mapProductPositions(
        productId: string,
        productPositions: ProductPositionResponse,
    ): ProductPositionMappedItem {
        return {
            productId,
            productPositions: productPositions.map((productPosition) => ({
                positionId: productPosition.positionId,
                point: {
                    x: productPosition.x,
                    y: productPosition.y,
                    z: productPosition.z,
                },
                productId: productPosition.productId,
                quantity: productPosition.quantity,
            })),
        };
    }
}
