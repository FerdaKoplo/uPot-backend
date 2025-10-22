import { Module } from '@nestjs/common';
import { AuthModule } from './module/auth/auth.module';
import { ForesterModule } from './module/foresters/forester.module';

@Module({
  imports: [
    AuthModule, ForesterModule
  ],
})
export class AppModule {}
