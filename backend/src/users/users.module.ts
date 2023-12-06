import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { UserRepository } from './users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
 providers: [UsersService ,UserRepository],
 exports: [UsersService ,UserRepository],
  controllers: [UsersController]
})
export class UsersModule {}
