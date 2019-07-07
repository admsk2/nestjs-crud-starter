import { Module, HttpModule, CacheModule } from '@nestjs/common';
import { ZombiesController } from './zombies.controller';
import { ZombiesService } from './zombies.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ZombieSchema } from './schemas/zombie.schema';
@Module({
    imports: [
      HttpModule,
      CacheModule.register({
        ttl: 5, // seconds,
        max: 10 // max number of items in cache
      }),
      MongooseModule.forFeature([{ name: 'Zombie', schema: ZombieSchema }])
    ],
    controllers: [ZombiesController],
    providers: [ZombiesService],
})
export class ZombiesModule {}