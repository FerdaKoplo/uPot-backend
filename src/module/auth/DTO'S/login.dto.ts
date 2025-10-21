import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDTO {
    @ApiProperty({
        description: 'Email address of the user',
        example: 'user@example.com',
    })
    @IsEmail()
    email: string

    @ApiProperty({
        description: 'Password for the user',
        example: 'strongPassword123',
    })
    @IsString()
    password: string
}