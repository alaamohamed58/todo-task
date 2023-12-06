import { Injectable } from "@nestjs/common";
import { Category } from "./category.entity";
import { DataSource, Repository } from "typeorm";


@Injectable()
export class CategoryRepository extends Repository<Category> {
    
    constructor(private dataSource: DataSource) {
        super(Category, dataSource.createEntityManager());
      }

    }