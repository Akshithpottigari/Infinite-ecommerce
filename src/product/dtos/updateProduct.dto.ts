import { ArrayMinSize, IsArray, IsEmail, IsNumber, IsString, IsUrl, Length, MaxLength, MinLength, Min, Max } from "class-validator";
import { IsObjectId } from "class-validator-mongo-object-id";
import { dataStandards } from "../../constants";
export class UpdateProductDTO {

    @IsString()
    @MinLength(dataStandards.productName.min)
    @MaxLength(dataStandards.productName.max)
    name: string;

    @IsString()
    @MinLength(dataStandards.productDescription.min)
    @MaxLength(dataStandards.productDescription.max)
    description: string;


    @IsNumber()
    @Min(dataStandards.productPrice.min)
    @Max(dataStandards.productPrice.max)
    price: number;

    @IsArray()
    // "each" tells class-validator to run the validation on each item of the array
    @IsString({ each: true })
    @ArrayMinSize(1)
    images: string[];

    @IsObjectId()
    categoryId: string;
}