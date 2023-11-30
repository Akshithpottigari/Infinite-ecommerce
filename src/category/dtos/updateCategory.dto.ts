import { IsEmail, IsString, IsUrl, Length, MaxLength, MinLength } from "class-validator";
import { dataStandards } from "../../constants";
export class UpdateCategoryDTO {
    @IsString()
    @MinLength(dataStandards.categoryName.min)
    @MaxLength(dataStandards.categoryName.max)
    name: string;

    @IsUrl()
    image: string;
}