import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtRefresh } from './strategies/jwt-refresh.strategy';
import { JwtStrategy } from './strategies/jwt-token.strategy';
import { PrismaService } from 'src/utils/prisma.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';


@Module({
    imports: [ConfigModule, PassportModule, JwtModule.register({})],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, JwtRefresh, PrismaService],
    exports: [AuthService]
})
export class AuthModule { }
