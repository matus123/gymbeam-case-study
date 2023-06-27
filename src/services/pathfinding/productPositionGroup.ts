import { ProductPosition } from './pathfinding.interfaces';

export class ProductGroup {
    private productsPositionMap = new Map<string, ProductPosition[]>();

    constructor(input: { productId: string; productPositions: ProductPosition[] }[]) {
        for (const { productId, productPositions } of input) {
            this.productsPositionMap.set(productId, productPositions);
        }
    }

    public getProductPositions(productId: string): ProductPosition[] {
        return this.productsPositionMap.get(productId) ?? [];
    }

    public productPositionDepleted(productId: string, positionId: string) {
        const productPositionIndex = this.productsPositionMap
            .get(productId)
            ?.findIndex((x) => x.positionId === positionId);

        if (productPositionIndex != null) {
            this.productsPositionMap.get(productId)?.splice(productPositionIndex, 1);
        }
    }

    public decrementProductPositionQuantity({ productId, positionId }: { productId: string; positionId: string }) {
        const productPosition = this.productsPositionMap.get(productId)?.find((x) => x.positionId === positionId);

        if (productPosition != null) {
            productPosition.quantity--;
        }

        if (productPosition?.quantity === 0) {
            this.productPositionDepleted(productId, positionId);
        }
    }
}
