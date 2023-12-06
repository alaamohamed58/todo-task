import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';
import { jwtPayloadUser } from './auth.model';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private UsersService: UsersService, ) {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey: process.env.JWT_SECRET,
        });
      }

  async validate(payload: jwtPayloadUser): Promise<any> {
    const { email }: any = payload;
    const _user = await this.UsersService.checkEmailExists(email);
  
    
    if (!_user) {
      throw new UnauthorizedException(); 
    }
    return _user;
  }
}