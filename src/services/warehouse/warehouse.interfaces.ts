import { Point } from '../pathfinding/pathfinding.interfaces';

export interface ProductPositionItem {
    positionId: string;
    x: number;
    y: number;
    z: number;
    productId: string;
    quantity: number;
}

export type ProductPositionResponse = ProductPositionItem[];

export interface ProductPositionMapped {
    positionId: string;
    point: Point;
    productId: string;
    quantity: number;
}

export interface ProductPositionMappedItem {
    productId: string;
    productPositions: ProductPositionMapped[];
}
