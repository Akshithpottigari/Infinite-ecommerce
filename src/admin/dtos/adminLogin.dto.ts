import { IsEmail, IsString, IsUrl, Length, MaxLength, MinLength } from "class-validator";
import { dataStandards } from "../../constants";
export class AdminLoginDTO {
    @IsEmail()
    email: string;

    @IsString()
    @Length(dataStandards.password.length)
    password: string
}