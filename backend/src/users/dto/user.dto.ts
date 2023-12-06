import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    required: true,
    description: 'The email address of the user',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    required: true,
    description: 'The first name of the user',
    example: 'John',
  })
  @MinLength(2)
  @MaxLength(20)
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    required: true,
    description: 'The last name of the user',
    example: 'Doe',
  })
  @MinLength(2)
  @MaxLength(20)
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    description: 'Password for Authorized User, Strong Ones only accepted ..',
    type: String,
  })
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Please Use Strong Password with max 20 character length ..',
  })
  password: string;
}

export class SigningDTO {
  @ApiProperty({
    required: true,
    description: 'The email address of the user',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    required: true,
    description: 'The password of the user',
    example: 'Mm@12345',
  })
  @IsNotEmpty()
  password: string;
}
