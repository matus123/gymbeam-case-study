import { Module } from '@nestjs/common';

import { WarehouseService } from './warehouse.service';
import { WarehouseApiService } from './warehouseApi.service';

@Module({
    providers: [WarehouseApiService, WarehouseService],
    exports: [WarehouseService],
})
export class WarehouseModule {}
