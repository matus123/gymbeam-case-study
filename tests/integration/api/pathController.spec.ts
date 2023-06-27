import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import nock from 'nock';
import request from 'supertest';

process.env.EXTERNAL_API_KEY = 'dummy';

import { OptimizePathBody } from '../../../src/api/controllers/path.controller';
import { AppModule } from '../../../src/app.module';
import config from '../../../src/config';
import { ProductPositionItem } from '../../../src/services/warehouse/warehouse.interfaces';

describe('#PathController', () => {
    let serviceApp: INestApplication;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();
        serviceApp = moduleRef.createNestApplication();

        await serviceApp.init();
    });

    afterAll(async () => {
        await serviceApp.close();
        nock.cleanAll();
    });

    describe('PathController', () => {
        describe('optimize-path', () => {
            test('should return optimized path', async () => {
                // arrange
                nock(config.externalService.url)
                    .get(/case-study\/products\/.*\/positions/)
                    .times(3)
                    .reply(function (uri) {
                        if (uri.includes('product-1')) {
                            return [
                                200,
                                [
                                    {
                                        positionId: 'position-122',
                                        x: 25,
                                        y: 50,
                                        z: 200,
                                        productId: 'product-1',
                                        quantity: 1,
                                    },
                                ] satisfies ProductPositionItem[],
                            ];
                        }

                        if (uri.includes('product-2')) {
                            return [
                                200,
                                [
                                    {
                                        positionId: 'position-15',
                                        x: 0,
                                        y: 53,
                                        z: 100,
                                        productId: 'product-2',
                                        quantity: 1,
                                    },
                                ] satisfies ProductPositionItem[],
                            ];
                        }

                        if (uri.includes('product-3')) {
                            return [
                                200,
                                [
                                    {
                                        positionId: 'position-1551',
                                        x: 145,
                                        y: 12,
                                        z: 0,
                                        productId: 'product-3',
                                        quantity: 1,
                                    },
                                ] satisfies ProductPositionItem[],
                            ];
                        }

                        return [200, [] satisfies ProductPositionItem[]];
                    });

                // act
                const response = await request(serviceApp.getHttpServer())
                    .post(`/optimize-path`)
                    .send({
                        startPosition: {
                            x: 0,
                            y: 0,
                            z: 0,
                        },
                        products: ['product-1', 'product-2', 'product-3'],
                    } satisfies OptimizePathBody);

                // assert
                expect(response.status).toEqual(200);
                expect(response.body).toEqual({
                    distance: 452.61149186348405,
                    pickingOrder: [
                        {
                            positionId: 'position-15',
                            productId: 'product-2',
                        },
                        {
                            positionId: 'position-122',
                            productId: 'product-1',
                        },
                        {
                            positionId: 'position-1551',
                            productId: 'product-3',
                        },
                    ],
                });
            });

            test('should return validation error', async () => {
                // arrange

                // act
                const response = await request(serviceApp.getHttpServer())
                    .post(`/optimize-path`)
                    .send({
                        startPosition: {
                            x: 0,
                        },
                        products: [],
                    });

                // assert
                expect(response.status).toEqual(400);
                expect(response.body).toEqual({
                    errorCode: 'invalid_query_parameters',
                    errors: [
                        {
                            code: 'invalid_type',
                            expected: 'number',
                            message: 'Required',
                            path: ['startPosition', 'y'],
                            received: 'undefined',
                        },
                        {
                            code: 'invalid_type',
                            expected: 'number',
                            message: 'Required',
                            path: ['startPosition', 'z'],
                            received: 'undefined',
                        },
                        {
                            code: 'too_small',
                            exact: false,
                            inclusive: true,
                            message: 'Array must contain at least 1 element(s)',
                            minimum: 1,
                            path: ['products'],
                            type: 'array',
                        },
                    ],
                    message: 'Invalid query parameters',
                });
            });
        });
    });
});
