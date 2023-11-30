import { IsEmail, IsString, IsUrl, Length, MaxLength, MinLength } from "class-validator";
import { dataStandards } from "../../constants";
export class ResetPasswordDTO {
    @IsEmail()
    email: string;

    @IsString()
    @Length(dataStandards.password.length)
    oldPassword: string;

    @IsString()
    @Length(dataStandards.password.length)
    newPassword: string;
}