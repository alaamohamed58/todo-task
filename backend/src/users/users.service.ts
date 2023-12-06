import { Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { User } from './users.entity';
import { CreateUserDto, SigningDTO } from './dto/user.dto';
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
    constructor(private userRepository: UserRepository) { }


      async registerUser(dto: CreateUserDto): Promise<any> {
        const checkEmailExists = await this.checkEmailExists(dto.email);
        if (checkEmailExists) {
            return {
                status: 400,
                messageAr: 'البريد الالكتروني موجود مسبقا',
                messageEn: 'email already exists',
            };
        }
    
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const user = this.userRepository.create({ ...dto, password: hashedPassword });
        const savedUser = await this.userRepository.save(user);
        if (savedUser) {
            return {
                status: 200,
                messageAr: 'تم الاضافة بنجاح',
                messageEn: 'added successfully',
            };
        }
    }


      async checkEmailExists(email: string): Promise<boolean> {
        const user = await this.userRepository.findOne({ where: { email: email } });
        return !!user;
      }


      async comparePasswords(enteredPassword: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(enteredPassword, hashedPassword);
      }

      async findUserByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne({ where: { email: email } });
      }




}
