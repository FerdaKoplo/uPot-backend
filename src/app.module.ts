import { Module } from '@nestjs/common';
import { AuthModule } from './module/auth/auth.module';
import { ForesterModule } from './module/foresters/forester.module';
import { ForestModule } from './module/forests/forest.module';

@Module({
  imports: [
    AuthModule, ForesterModule, ForestModule
  ],
})
export class AppModule {}
