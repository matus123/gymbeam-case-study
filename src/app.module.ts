import { Module, OnApplicationBootstrap } from '@nestjs/common';

import { ApiModule } from './api/api.module';
import config from './config';

@Module({
    imports: [ApiModule],
})
export class AppModule implements OnApplicationBootstrap {
    async onApplicationBootstrap() {
        if (config.externalService.apiKey == null) {
            throw new Error('Missing EXTERNAL_API_KEY environment variable');
        }
    }
}
