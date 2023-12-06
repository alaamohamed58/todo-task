import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
import { Category } from './category.entity';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
    constructor(private categoryService: CategoryService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new category', description: 'Create a new category' })
    @ApiBody({ type: CreateCategoryDto })
    async createCategory(@Body() dto : CreateCategoryDto): Promise<Category> {
        return await this.categoryService.createCategory(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all categories', description: 'Get all categories' })
    async getAllCategories(): Promise<Category[]> {
        return await this.categoryService.getAllCategories();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get category by id', description: 'Get category by id' })
    async getCategoryById(@Param('id') id: number): Promise<Category> {
        return await this.categoryService.getCategoryById(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update category by id', description: 'Update category by id' })
    async updateCategory(@Param('id') id: number, @Body() dto : UpdateCategoryDto): Promise<Category> {
        return await this.categoryService.updateCategory(id, dto);
    }

}
