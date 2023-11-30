import { Controller, Post, Get, Delete, Put, Body, Param, Query, ParseIntPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDTO } from './dtos/createProduct.dto';
import { User } from '../decorators/user.decorator';
import { Admin } from '../types';
import { UpdateProductDTO } from './dtos/updateProduct.dto';

//✅ Create
// ✅update
// ✅Ddelete
// filter


@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post("create")
  async createProduct(@Body() body: CreateProductDTO, @User() user: Admin) {
    return await this.productService.createProduct(body, user);
  }

  @Put("update/:productId")
  async updateProduct(@Param("productId") productId: string, @Body() body: UpdateProductDTO, @User() user: Admin) {
    return await this.productService.updateProduct(productId, body, user);
  }

  @Delete("delete/:productId")
  async deleteProduct(@Param("productId") productId: string, @User() user: Admin) {
    return await this.productService.deleteProduct(productId, user);
  }

  @Get("filtered-results")
  async filteredResults(
    @User() user: Admin,
    @Query('name') name?: string,
    @Query('categoryId') categoryId?: string,
    @Query('minPrice') minPrice?: number,
    @Query('maxPrice') maxPrice?: number,
    @Query('fromDate') fromDate?: Date,
    @Query('toDate') toDate?: Date,
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
  ) {
    console.log("controller", page, pageSize, name, categoryId, minPrice, maxPrice, fromDate, toDate)

    return await this.productService.filteredResults(user, page, pageSize, name, categoryId, minPrice, maxPrice, fromDate, toDate,);
  }



}
