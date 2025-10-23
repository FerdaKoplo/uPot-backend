import { Module } from '@nestjs/common';
import { AuthModule } from './module/auth/auth.module';
import { ForesterModule } from './module/foresters/forester.module';
import { ForestModule } from './module/forests/forest.module';
import { BranchModule } from './module/branches/branch.module';
import { PrismaModule } from './utils/prisma.module';
import { ForesterController } from './module/foresters/forester.controller';
import { ForestController } from './module/forests/forest.controller';
import { BranchController } from './module/branches/branch.controller';
import { BranchService } from './module/branches/branch.service';
import { ForestService } from './module/forests/forest.service';
import { ForesterService } from './module/foresters/forester.service';

@Module({
  imports: [
    AuthModule, ForesterModule, ForestModule,
    BranchModule, PrismaModule
  ],
  controllers: [ForesterController, ForestController, BranchController],
  providers: [ForesterService, ForestService, BranchService],
})

export class AppModule { }
