import { User } from '../decorators/user.decorator';
import { Admin } from '../types';
import { CategoryService } from './category.service';
import { Controller, Post, Get, Delete, Put, Body, Param } from '@nestjs/common';
import { CreateCategoryDTO } from './dtos/createCategory.dto';
import { UpdateCategoryDTO } from './dtos/updateCategory.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Post("create")
  async createCategory(@Body() body: CreateCategoryDTO, @User() user: Admin) {
    return await this.categoryService.createCategory(body, user);
  }

  @Get("get-all")
  async getAllAdminCategories(@User() user: Admin) {
    return await this.categoryService.getAllAdminCategories(user);
  }

  @Get("get/:categoryId")
  async getCategoryInfo(@Param("categoryId") categoryId, @User() user: Admin) {
    return await this.categoryService.getCategoryInfo(categoryId, user)
  }

  @Put("update/:categoryId")
  async updateCategory(@Param("categoryId") categoryId, @Body() body: UpdateCategoryDTO, @User() user: Admin) {
    return await this.categoryService.updateCategory(categoryId, body, user)
  }

  @Delete("delete/:categoryId")
  async deleteCategory(@Param("categoryId") categoryId, @User() user: Admin) {
    return await this.categoryService.deleteCategory(categoryId, user);
  }

  @Get("get-products/:categoryId")
  async getCategoryProducts(@Param("categoryId") categoryId, @User() user: Admin) {
    return await this.categoryService.getCategoryProducts(categoryId, user);
  }

}
