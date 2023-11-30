import { IsEmail, IsString, IsUrl, Length, MaxLength, MinLength } from "class-validator";
import { dataStandards } from "../../constants";

export class CreateAdminDTO {
    @IsString()
    @MinLength(dataStandards.adminName.min)
    @MaxLength(dataStandards.adminName.max)
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @Length(dataStandards.password.length)
    password: string;

    @IsUrl()
    avatar: string;
}