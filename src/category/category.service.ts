import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Admin } from '../types';
import { CreateCategoryDTO } from './dtos/createCategory.dto';
import { UpdateCategoryDTO } from './dtos/updateCategory.dto';

@Injectable()
export class CategoryService {
    constructor(
        private prismaService: PrismaService
    ) { }

    async createCategory(payload: CreateCategoryDTO, user: Admin) {
        try {
            let admin = await this.prismaService.admin.findUnique(
                {
                    where: {
                        id: user.id
                    }
                }
            );
            if (!admin) return { error: "Admin not found" };

            await this.prismaService.category.create(
                {
                    data: {
                        ...payload,
                        adminId: user.id
                    }
                }
            );
            return { data: "Category created successfully" };
        } catch (error) {
            return { error: error.message };
        }
    }

    async getAllAdminCategories(user: Admin) {
        try {
            let categories = await this.prismaService.category.findMany(
                {
                    where: {
                        adminId: user.id
                    }
                }
            );
            return { data: categories };
        } catch (error) {
            return { error: error.message };
        }
    }

    async getCategoryInfo(categoryId: string, user: Admin) {
        try {
            let category = await this.prismaService.category.findUnique(
                {
                    where: {
                        id: categoryId,
                        adminId: user.id
                    }
                }
            );
            if (!category) return { error: "Category not found" };
            return { data: category };
        } catch (error) {
            return { error: error.message };
        }
    }

    async updateCategory(categoryId: string, payload: UpdateCategoryDTO, user: Admin) {
        try {
            let category = await this.prismaService.category.findUnique({ where: { id: categoryId, adminId: user.id } });
            if (!category) return { error: "Category not found" };
            await this.prismaService.category.update({
                where: {
                    id: categoryId,
                    adminId: user.id
                },
                data: {
                    ...payload
                }
            });
            return { data: "Updated Category Successfully" };
        } catch (error) {
            return { error: error.message };
        }
    }

    async deleteCategory(categoryId: string, user: Admin) {
        try {
            let category = await this.prismaService.category.findUnique(
                {
                    where: {
                        id: categoryId,
                        adminId: user.id
                    }
                }
            );
            if (!category) return { error: "Category not found" };

            await this.prismaService.category.delete(
                {
                    where: {
                        id: categoryId,
                    }
                }
            );
            await this.prismaService.product.deleteMany(
                {
                    where: {
                        categoryId
                    }
                }
            );

            return { data: "Category and Products associated with this category are deleted" };
        } catch (error) {
            return { error: error.message };
        }
    }

    async getCategoryProducts(categoryId: string, user: Admin) {
        try {
            let products = await this.prismaService.product.findMany(
                {
                    where: {
                        categoryId,
                        adminId: user.id
                    }
                }
            );
            return { data: products };
        } catch (error) {
            return { error: error.message };
        }
    }
}
