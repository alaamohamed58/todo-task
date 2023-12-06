import { Task } from "src/tasks/tasks.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";




@Entity("categories")
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "category_id" })
  category_id: number;

  @Column("varchar", { name: "category_name_ar", length: 20, unique: true })
  categoryNameAr: string;

  @Column("varchar", { name: "category_name_en", length: 20 , unique: true})
  categoryNameEn: string;
  
  @OneToMany(() => Task, (task) => task.category)
  task: Task[];

}