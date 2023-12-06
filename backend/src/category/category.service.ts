import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { Category } from './category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
    constructor(private categoryRepository: CategoryRepository) { }


    async createCategory(dto : CreateCategoryDto): Promise<Category> {
        return await this.categoryRepository.save(dto);
    }

    async getAllCategories(): Promise<Category[]> {
        return await this.categoryRepository.find();
    }

    async getCategoryById(id: number): Promise<Category> {
        return await this.categoryRepository.findOne({ where: { category_id: id } });
    }

    async updateCategory(id: number, dto: UpdateCategoryDto): Promise<Category> {
        await this.categoryRepository.update(id, dto);
        return this.getCategoryById(id);
    }

}
