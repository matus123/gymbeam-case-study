import { PathfindingResultInfo } from '../../../src/services/pathfinding/pathfinding.interfaces';
import { PathfindingService } from '../../../src/services/pathfinding/pathfinding.service';
import { ProductGroup } from '../../../src/services/pathfinding/productPositionGroup';

describe('PathfindingService', () => {
    const pathfindingService = new PathfindingService();

    it('findShortestPath', async () => {
        // arrange
        const startPosition = { x: 0, y: 0, z: 0 };

        // act
        // test assert 1
        expect(
            pathfindingService.findShortestPath({
                startPosition,
                products: ['product2', 'product1', 'product1'],
                productPositionsGroup: new ProductGroup([
                    {
                        productId: 'product1',
                        productPositions: [
                            {
                                positionId: 'product1-1',
                                productId: 'product1',
                                point: { x: 0, y: 0, z: 50 },
                                quantity: 1,
                            },
                            {
                                positionId: 'product1-2',
                                productId: 'product1',
                                point: { x: 0, y: 0, z: 100 },
                                quantity: 1,
                            },
                        ],
                    },
                    {
                        productId: 'product2',
                        productPositions: [
                            {
                                positionId: 'product2-1',
                                productId: 'product2',
                                point: { x: 0, y: 0, z: 150 },
                                quantity: 1,
                            },
                        ],
                    },
                ]),
            }),
        ).toEqual<PathfindingResultInfo>({
            distance: 150,
            path: [
                {
                    productId: 'product1',
                    positionId: 'product1-1',
                },
                {
                    productId: 'product1',
                    positionId: 'product1-2',
                },
                {
                    productId: 'product2',
                    positionId: 'product2-1',
                },
            ],
        });

        // test assert 2
        expect(
            pathfindingService.findShortestPath({
                startPosition,
                products: ['product2', 'product1', 'product1'],
                productPositionsGroup: new ProductGroup([
                    {
                        productId: 'product1',
                        productPositions: [
                            {
                                positionId: 'product1-1',
                                productId: 'product1',
                                point: { x: 0, y: 0, z: 50 },
                                quantity: 2,
                            },
                        ],
                    },
                    {
                        productId: 'product2',
                        productPositions: [
                            {
                                positionId: 'product2-1',
                                productId: 'product2',
                                point: { x: 0, y: 0, z: 150 },
                                quantity: 1,
                            },
                        ],
                    },
                ]),
            }),
        ).toEqual<PathfindingResultInfo>({
            distance: 150,
            path: [
                {
                    productId: 'product1',
                    positionId: 'product1-1',
                },
                {
                    productId: 'product1',
                    positionId: 'product1-1',
                },
                {
                    productId: 'product2',
                    positionId: 'product2-1',
                },
            ],
        });
    });

    it('findShortestPath - complex', async () => {
        // arrange
        const startPosition = { x: 0, y: 0, z: 0 };

        // act
        // test assert
        expect(
            pathfindingService.findShortestPath({
                startPosition,
                products: ['product-2', 'product-1', 'product-3'],
                productPositionsGroup: new ProductGroup([
                    {
                        productId: 'product-1',
                        productPositions: [
                            {
                                positionId: 'position-31',
                                point: { x: 3, y: 1, z: 0 },

                                productId: 'product-1',
                                quantity: 13,
                            },
                            {
                                positionId: 'position-449',
                                point: { x: 87, y: 7, z: 100 },

                                productId: 'product-1',
                                quantity: 4,
                            },
                            {
                                positionId: 'position-404',
                                point: { x: 42, y: 6, z: 100 },

                                productId: 'product-1',
                                quantity: 16,
                            },
                            {
                                positionId: 'position-282',
                                point: { x: 36, y: 0, z: 100 },

                                productId: 'product-1',
                                quantity: 12,
                            },
                            {
                                positionId: 'position-458',
                                point: { x: 24, y: 10, z: 100 },

                                productId: 'product-1',
                                quantity: 10,
                            },
                            {
                                positionId: 'position-175',
                                point: { x: 75, y: 7, z: 0 },

                                productId: 'product-1',
                                quantity: 9,
                            },
                            {
                                positionId: 'position-397',
                                point: { x: 21, y: 6, z: 100 },

                                productId: 'product-1',
                                quantity: 6,
                            },
                        ],
                    },
                    {
                        productId: 'product-2',
                        productPositions: [
                            {
                                positionId: 'position-241',
                                point: { x: 3, y: 12, z: 0 },

                                productId: 'product-2',
                                quantity: 12,
                            },
                            {
                                positionId: 'position-245',
                                point: { x: 15, y: 12, z: 0 },

                                productId: 'product-2',
                                quantity: 5,
                            },
                            {
                                positionId: 'position-234',
                                point: { x: 72, y: 11, z: 0 },

                                productId: 'product-2',
                                quantity: 12,
                            },
                        ],
                    },
                    {
                        productId: 'product-3',
                        productPositions: [
                            {
                                positionId: 'position-342',
                                point: { x: 36, y: 2, z: 100 },

                                productId: 'product-3',
                                quantity: 6,
                            },
                            {
                                positionId: 'position-720',
                                point: { x: 0, y: 10, z: 200 },

                                productId: 'product-3',
                                quantity: 9,
                            },
                            {
                                positionId: 'position-373',
                                point: { x: 39, y: 5, z: 100 },

                                productId: 'product-3',
                                quantity: 13,
                            },
                            {
                                positionId: 'position-616',
                                point: { x: 48, y: 2, z: 200 },

                                productId: 'product-3',
                                quantity: 5,
                            },
                            {
                                positionId: 'position-632',
                                point: { x: 6, y: 5, z: 200 },

                                productId: 'product-3',
                                quantity: 15,
                            },
                            {
                                positionId: 'position-124',
                                point: { x: 12, y: 6, z: 0 },

                                productId: 'product-3',
                                quantity: 9,
                            },
                            {
                                positionId: 'position-201',
                                point: { x: 63, y: 10, z: 0 },

                                productId: 'product-3',
                                quantity: 8,
                            },
                        ],
                    },
                ]),
            }),
        ).toEqual<PathfindingResultInfo>({
            distance: 20.166111733654752,
            path: [
                {
                    productId: 'product-1',
                    positionId: 'position-31',
                },
                {
                    productId: 'product-3',
                    positionId: 'position-124',
                },
                {
                    productId: 'product-2',
                    positionId: 'position-245',
                },
            ],
        });
    });
});
