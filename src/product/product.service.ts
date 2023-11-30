import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateProductDTO } from './dtos/createProduct.dto';
import { Admin } from '../types';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductService {
    constructor(
        private prismaService: PrismaService
    ) { }

    async createProduct(payload: CreateProductDTO, user: Admin) {
        try {

            let category = await this.prismaService.category.findUnique(
                {
                    where: {
                        id: payload.categoryId,
                        adminId: user.id
                    }
                }
            );
            if (!category) return { error: "Admin has no such category" };
            let product = await this.prismaService.product.create({
                data: {
                    ...payload,
                    adminId: user.id
                }
            });
            return { data: "Product created successfully" };
        } catch (error) {
            return { error: error.message }
        }
    }

    async updateProduct(productId: string, payload: CreateProductDTO, user: Admin) {
        try {

            let category = await this.prismaService.category.findUnique(
                {
                    where: {
                        id: payload.categoryId,
                        adminId: user.id
                    }
                }
            );
            if (!category) return { error: "Admin has no such category" };
            let product = await this.prismaService.product.findUnique({ where: { id: productId, adminId: user.id } });
            if (!product) return { error: "Product not found" };
            await this.prismaService.product.update({
                where: {
                    id: productId,
                    adminId: user.id
                },
                data: {
                    ...payload
                }
            });
            return { data: "Product updated successfully" };
        } catch (error) {
            return { error: error.message }
        }
    }

    async deleteProduct(producId: string, user: Admin) {
        try {
            let product = await this.prismaService.product.findUnique({ where: { id: producId, adminId: user.id } });
            if (!product) return { error: "Product not found" };
            await this.prismaService.product.delete(
                {
                    where: {
                        id: producId,
                        adminId: user.id
                    }
                }
            );

            return { data: "Product deleted successfully" };
        } catch (error) {
            return { error: error.message };
        }
    }

    async filteredResults(
        user: Admin,
        page: number = 1,
        pageSize: number = 10,
        name?: string,
        categoryId?: string,
        minPrice?: number,
        maxPrice?: number,
        fromDate?: Date,
        toDate?: Date,
    ) {
        try {
            const where = { adminId: user.id };

            if (name) {
                Object.assign(where, { name: { contains: name, mode: 'insensitive' } });
            }

            if (categoryId) {
                Object.assign(where, { categoryId });
            }

            if (maxPrice !== undefined && !Number.isNaN(maxPrice) && minPrice !== undefined && !Number.isNaN(minPrice)) {
                Object.assign(where, {
                    price: { lte: maxPrice, gte: minPrice }
                })
            } else {
                if (minPrice !== undefined && !Number.isNaN(minPrice)) {
                    Object.assign(where, { price: { gte: minPrice } });
                }

                if (maxPrice !== undefined && !Number.isNaN(maxPrice)) {
                    Object.assign(where, { price: { lte: maxPrice } });
                }
            }





            if (fromDate) {
                Object.assign(where, { createdAt: { gte: fromDate } });
            }

            if (toDate) {
                Object.assign(where, { createdAt: { lte: toDate } });
            }
            const findManyOptions: Prisma.ProductFindManyArgs = {
                where,
                skip: (page - 1) * pageSize || 0,
                orderBy: { createdAt: 'desc' }, // Adjust as needed
            };
            if (pageSize) findManyOptions.take = pageSize;
            console.log('findManyOptions: ', findManyOptions);
            const products = await this.prismaService.product.findMany(findManyOptions);
            return { data: products };
        } catch (error) {
            return { error: error.message };
        }
    }
}
