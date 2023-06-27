import { Module } from '@nestjs/common';

import { PathfindingService } from './pathfinding.service';

@Module({
    providers: [PathfindingService],
    exports: [PathfindingService],
})
export class PathfindingModule {}
