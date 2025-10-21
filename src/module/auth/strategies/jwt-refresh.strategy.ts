import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy, StrategyOptionsWithRequest } from "passport-jwt";

@Injectable()
export class JwtRefresh extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor(private readonly configService: ConfigService) {

        const secret = configService.get<string>('JWT_REFRESH_SECRET')
        if (!secret) {
            new UnauthorizedException('JWT secret not found in environment variables')
        }

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: secret,
            passReqToCallback: true
        } as StrategyOptionsWithRequest)
    }

    validate(req: Request, payload: any) {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            throw new UnauthorizedException('Authorization header not found');
        }

        const refreshToken = authHeader.replace('Bearer', '').trim();
        if (!refreshToken) {
            throw new UnauthorizedException('Refresh token not provided');
        }

        return { ...payload, refreshToken };
    }
}