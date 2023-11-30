import { IsEmail, IsString, IsUrl, Length, MaxLength, MinLength } from "class-validator";
import { dataStandards } from "../../constants";
export class UpdateAdminDTO {
    @IsString()
    @IsString()
    @MinLength(dataStandards.adminName.min)
    @MaxLength(dataStandards.adminName.max)
    name: string;

    @IsUrl()
    avatar: string;
}