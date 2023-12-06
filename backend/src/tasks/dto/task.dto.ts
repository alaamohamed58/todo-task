import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    required: true,
    description: 'the title of the task',
    example: 'ذهاب الي السوق',
  })
  @MinLength(4)
  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    required: true,
    description: 'the title of the task',
    example: 'ذهاب الي السوق',
  })
  @MinLength(4)
  @MaxLength(250)
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    required: true,
    description: 'the date of the task',
    example: '20-12-2025',
  })
  @IsString()
  @IsNotEmpty()
  due_date: string;
  @ApiProperty({
    required: true,
    description: 'User ID',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @ApiProperty({
    required: true,
    description: 'Category ID',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  category_id: number;
}

export class UpdateTaskDto {
  @ApiProperty({
    required: true,
    description: 'the title of the task',
    example: 'ذهاب الي السوق',
  })
  @MinLength(4)
  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    required: true,
    description: 'the title of the task',
    example: 'ذهاب الي السوق',
  })
  @MinLength(4)
  @MaxLength(250)
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    required: true,
    description: 'the date of the task',
    example: '20-12-2025',
  })
  @IsString()
  @IsNotEmpty()
  due_date: string;

  @ApiProperty({
    required: true,
    description: 'Category ID',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  category_id: number;

  @ApiProperty({
    required: true,
    description: 'Status ID',
    example: 1,
    enum: [1, 2],
  })
  @IsNumber()
  @IsNotEmpty()
  status: number;
}
