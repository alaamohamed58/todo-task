import { Category } from 'src/category/category.entity';
import { User } from 'src/users/users.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

enum StatusTask {
  Pending = 1,
  Completed = 2,
}

@Entity('tasks')
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'task_id' })
  task_id: number;

  @Column('varchar', { name: 'title', length: 100, nullable: false })
  title: string;

  @Column('varchar', { name: 'description', length: 250, nullable: false })
  description: string;

  @Column('varchar', { name: 'due_date ', length: 250, nullable: false })
  due_date: Date;

  @Column('int', { name: 'user_id' })
  user_id: number;

  @Column('int', { name: 'category_id' })
  category_id: number;

  @Column('int', { name: 'status', default: StatusTask.Pending })
  status: number;

  @ManyToOne(() => Category, (category) => category.task, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'category_id', referencedColumnName: 'category_id' }])
  category: Category;

  @ManyToOne(() => User, (user) => user.task, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'user_id' }])
  user: User;
}
