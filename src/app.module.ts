import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ZombiesModule } from './zombies/zombies.module';

@Module({
  imports: [
    MongooseModule.forRoot(dotenv.config().parsed.MONGODB_URI),
    ZombiesModule
  ]
})
export class AppModule {}
