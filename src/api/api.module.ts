import { Module } from '@nestjs/common';

import { PathfindingModule } from '../services/pathfinding/pathfinding.module';
import { WarehouseModule } from '../services/warehouse/warehouse.module';
import { PathController } from './controllers/path.controller';

@Module({
    controllers: [PathController],
    imports: [WarehouseModule, PathfindingModule],
})
export class ApiModule {}
