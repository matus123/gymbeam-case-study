export interface PathfindingResultInfo {
    path: { productId: string; positionId: string }[];
    distance: number;
}

export interface Point {
    x: number;
    y: number;
    z: number;
}

export interface ProductPosition {
    positionId: string;
    productId: string;
    point: { x: number; y: number; z: number };
    quantity: number;
}
