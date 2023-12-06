import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SigningDTO } from 'src/users/dto/user.dto';
import { UsersService } from 'src/users/users.service';
import { jwtPayloadUser } from './auth.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async loginUser(dto: SigningDTO): Promise<any> {
    const user = await this.userService.findUserByEmail(dto.email);
    if (!user) {
      return {
        status: 400,
        messageEn: 'Invalid email or password',
        messageAr: 'Invalid email or password',
      };
    }

    const isPasswordValid = await this.userService.comparePasswords(
      dto.password,
      user.password,
    );
    if (!isPasswordValid) {
      return {
        status: 400,
        messageEn: 'Invalid email or password',
        messageAr: 'Invalid email or password',
      };
    }

    const payload: jwtPayloadUser = {
      email: user.email,
      user_id: user.user_id,
    };

    const responseData = {
      accessToken: this.jwtService.sign(payload),

      user: {
        email: user.email,
        user_id: user.user_id,
      },
    };

    return { status: 200, data: responseData };
  }
}
