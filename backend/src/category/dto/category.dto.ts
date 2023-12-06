import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty({
      required: true,
      description: "The arabic name of the category",
      example: "مكتمل",
    })
    @MinLength(3)
    @MaxLength(20)
    @IsString()
    @IsNotEmpty()
    categoryNameAr: string;
  

    @ApiProperty({
        required: true,
        description: "The english name  of the category",
        example: "Completed",
      })
      @MinLength(3)
      @MaxLength(20)
      @IsString()
      @IsNotEmpty()
      categoryNameEn: string;
    

  }


  export class UpdateCategoryDto {
    @ApiProperty({
      required: true,
      description: "The arabic name of the category",
      example: "مكتمل",
    })
    @MinLength(3)
    @MaxLength(20)
    @IsString()
    @IsNotEmpty()
    categoryNameAr: string;
  

    @ApiProperty({
        required: true,
        description: "The english name  of the category",
        example: "Completed",
      })
      @MinLength(3)
      @MaxLength(20)
      @IsString()
      @IsNotEmpty()
      categoryNameEn: string;
    

  }