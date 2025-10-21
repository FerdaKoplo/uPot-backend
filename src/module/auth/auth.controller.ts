import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDTO } from "./DTO'S/register.dto";
import { LoginDTO } from "./DTO'S/login.dto";
import { JwtRefreshGuard } from "src/common/guards/jwt-refresh.guard";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    register(@Body() dto: RegisterDTO) {
        return this.authService.register(dto);
    }

    @Post('login')
    login(@Body() dto: LoginDTO) {
        return this.authService.login(dto);
    }

    @UseGuards(JwtRefreshGuard)
    @Post('refresh')
    refreshTokens(@Req() req) {
        const userId = req.user.sub;
        const refreshToken = req.user.refreshToken;
        return this.authService.refreshToken(userId, refreshToken);
    }

    @Post('logout')
    logout(@Req() req) {
        return this.authService.logout(req.user.sub);
    }
}