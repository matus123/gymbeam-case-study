import { Injectable } from '@nestjs/common';

import { PathfindingResultInfo, Point, ProductPosition } from './pathfinding.interfaces';
import { ProductGroup } from './productPositionGroup';

@Injectable()
export class PathfindingService {
    public findShortestPath({
        startPosition,
        products,
        productPositionsGroup,
    }: {
        startPosition: Point;
        products: string[];
        productPositionsGroup: ProductGroup;
    }): PathfindingResultInfo {
        let currentPosition = startPosition;
        const productsToCollect = [...products];

        const finalPath = {
            distance: 0,
            path: [] as { productId: string; positionId: string }[],
        };

        while (productsToCollect.length > 0) {
            const nextProductPosition = this.findNearestProduct(
                currentPosition,
                productsToCollect,
                productPositionsGroup,
            );

            if (nextProductPosition == null) {
                // this might happend if there is no productPosition for a product
                throw new Error(`No path found: ${productsToCollect.join(', ')}, ${JSON.stringify(finalPath)}`);
            }

            if (nextProductPosition) {
                finalPath.distance += nextProductPosition.distance;
                finalPath.path.push({
                    productId: nextProductPosition.productPosition.productId,
                    positionId: nextProductPosition.productPosition.positionId,
                });
                currentPosition = nextProductPosition.productPosition.point;

                productPositionsGroup.decrementProductPositionQuantity({
                    positionId: nextProductPosition.productPosition.positionId,
                    productId: nextProductPosition.productPosition.productId,
                });
                productsToCollect.splice(productsToCollect.indexOf(nextProductPosition?.productPosition.productId), 1);
            }
        }

        return finalPath;
    }

    private findNearestProduct(
        currentPosition: Point,
        productsToCollect: string[],
        productPositionGroup: ProductGroup,
    ): { distance: number; productPosition: ProductPosition } | null {
        let nearestProduct: { distance: number; productPosition: ProductPosition } | null = null;

        for (const productId of productsToCollect) {
            const productPositions = productPositionGroup.getProductPositions(productId);

            for (const productPosition of productPositions) {
                if (nearestProduct == null) {
                    nearestProduct = {
                        distance: this.calculateDistanceBetweenPoints(currentPosition, productPosition.point),
                        productPosition,
                    };
                }
                const newDistance = this.calculateDistanceBetweenPoints(currentPosition, productPosition.point);
                if (newDistance < nearestProduct.distance) {
                    nearestProduct.distance = newDistance;
                    nearestProduct.productPosition = productPosition;
                }
            }
        }

        return nearestProduct;
    }

    private calculateDistanceBetweenPoints(point1: Point, point2: Point): number {
        const dx = point1.x - point2.x;
        const dy = point1.y - point2.y;
        const dz = point1.z - point2.z;
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }
}
