import { ForbiddenException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/utils/prisma.service";
import { RegisterDTO } from "./DTO'S/register.dto";
import { compareHash, hashData } from "src/utils/hash";
import { randomBytes } from "crypto";
import * as bcrypt from 'bcryptjs'
import { LoginDTO } from "./DTO'S/login.dto";

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) { }

    async issueTokens(userId: number, email: string, userAgent?: string) {
        const payload = { sub: userId, email };

        const accessToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_ACCESS_SECRET,
            expiresIn: '15m',
        });

        const refreshTokenPlain = randomBytes(32).toString('hex');
        const hashedRefreshToken = await bcrypt.hash(refreshTokenPlain, 10);

        await this.prisma.refreshToken.create({
            data: {
                token: hashedRefreshToken,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                foresterId: userId,
                userAgent,
            },
        });

        return { accessToken, refreshToken: refreshTokenPlain };
    }


    async refreshToken(userId: number, refreshToken: string) {
        const tokenRecord = await this.prisma.refreshToken.findFirst({
            where: {
                foresterId: userId,
                revoked: false,
                expiresAt: { gt: new Date() }
            },
            orderBy: { createdAt: 'desc' },
            include: { forester: true }

        });

        if (!tokenRecord) throw new ForbiddenException('Access Denied');

        const matches = await bcrypt.compare(refreshToken, tokenRecord.token);
        if (!matches) throw new ForbiddenException('Access Denied');

        return this.issueTokens(userId, tokenRecord.forester.email);
    }

    async register(dto: RegisterDTO) {
        const hashedPassword = await hashData(dto.password)

        const forester = await this.prisma.forester.create({
            data: {
                username: dto.username,
                fullName: dto.fullname,
                email: dto.email,
                passwordHash: hashedPassword
            }
        })

        return this.issueTokens(forester.id, forester.email)
    }

    async login(dto: LoginDTO) {
        const forester = await this.prisma.forester.findUnique({
            where: { email: dto.email },
        })
        if (!forester) throw new ForbiddenException('Invalid credentials')

        const pwMatches = await compareHash(dto.password, dto.password)
        if (!pwMatches) throw new ForbiddenException('Invalid credentials')

        return this.issueTokens(forester.id, forester.email)
    }

    async logout(userId: number) {
        await this.prisma.refreshToken.updateMany({
            where: { foresterId: userId, revoked: false },
            data: { revoked: true }
        })
    }
}