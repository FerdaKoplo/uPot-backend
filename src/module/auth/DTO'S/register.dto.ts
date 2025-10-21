import { IsEmail, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterDTO {
    @ApiProperty({
        description: "User's email address",
        example: "user@example.com",
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: "Username for the account",
        example: "john_doe",
        minLength: 4,
    })
    @IsString()
    @MinLength(4)
    username: string;

    @ApiProperty({
        description: "Full name of the user",
        example: "John Doe",
        minLength: 5,
    })
    @IsString()
    @MinLength(5)
    fullname: string;

    @ApiProperty({
        description: "Password for the account",
        example: "strongPassword123",
        minLength: 6,
    })
    @IsString()
    @MinLength(6)
    password: string;
}
