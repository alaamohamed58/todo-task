import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, SigningDTO } from 'src/users/dto/user.dto';
import { UsersService } from 'src/users/users.service';

@ApiTags('Auth')

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService,
        private userService: UsersService,

        ) { }

        @Post('register')
        @ApiOperation({ summary: 'Register a new user', description: 'Register a new user' })
        @ApiBody({ type: CreateUserDto })
        async registerUser(@Body() createUserDto: CreateUserDto) {
          return await this.userService.registerUser(createUserDto);
        }

        @Post('login')
        @ApiOperation({ summary: 'User Login' })    
        @ApiBody({ type: SigningDTO }) 
    
        async login(@Body() dto: SigningDTO) {
        return await this.authService.loginUser(dto);
        }
  
}
