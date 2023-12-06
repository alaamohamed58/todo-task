import { Task } from 'src/tasks/tasks.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'user_id' })
  user_id: number;

  @Column('varchar', { name: 'email', length: 250, unique: true })
  email: string;

  @Column('varchar', { name: 'first_name', length: 20, nullable: true })
  firstName: string;

  @Column('varchar', { name: 'last_name', length: 20, nullable: true })
  lastName: string;

  @Column('varchar', { name: 'password', length: 200 })
  password: string;

  @OneToMany(() => Task, (task) => task.user)
  task: Task[];
}
