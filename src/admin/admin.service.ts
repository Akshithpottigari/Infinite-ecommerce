import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateAdminDTO } from './dtos/createAdmin.dto';
import { Admin } from '../types';
import { UpdateAdminDTO } from './dtos/updateAdmin.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt";
import { BCRYPT_CONFIG, JWT_CONFIG } from '../constants';
import { AdminLoginDTO } from './dtos/adminLogin.dto';
import { ResetPasswordDTO } from './dtos/resetPassword.dto';
@Injectable()
export class AdminService {
    constructor(
        private prismaService: PrismaService,
        private jwtService: JwtService,
    ) { }

    async createAdmin(payload: CreateAdminDTO) {
        try {
            let hashedPassword = await bcrypt.hash(payload.password, BCRYPT_CONFIG.saltRounds);
            await this.prismaService.admin.create(
                {
                    data: {
                        ...payload,
                        password: hashedPassword
                    }
                }
            );
            return { data: "Admin Created Successfully" };
        } catch (error) {
            return { error: error.message };
        }
    }

    async login(payload: AdminLoginDTO) {
        try {
            let admin = await this.prismaService.admin.findUnique(
                {
                    where: {
                        email: payload.email
                    }
                }
            );
            if (!admin) return { error: "Admin not found" };
            let isPasswordCorrect = await bcrypt.compare(payload.password, admin.password);
            if (!isPasswordCorrect) {
                return { error: "Incorrect password" };
            }
            delete admin.password;
            let access_token = await this.jwtService.signAsync(admin, { expiresIn: JWT_CONFIG.access_token_expires_in });
            let refresh_token = await this.jwtService.signAsync(admin, { expiresIn: JWT_CONFIG.refresh_token_expires_in });
            return {
                data: {
                    access_token, refresh_token
                }
            };
        } catch (error) {
            return { error: error.message };
        }
    }

    async updateAdmin(payload: UpdateAdminDTO, user: Admin) {
        try {
            await this.prismaService.admin.update(
                {
                    where: {
                        email: user.email
                    },
                    data: {
                        ...payload
                    }
                }
            );
            return { data: "Admin Updated Successfully" };
        } catch (error) {
            return { error: error.message };
        }
    }

    async getAdminInfo(user: Admin) {
        try {
            let admin = await this.prismaService.admin.findUnique(
                {
                    where: {
                        email: user.email
                    },
                },

            );
            delete admin.password;
            return { data: admin }
        } catch (error) {
            return { error: error.message };
        }
    }

    async resetPassword(payload: ResetPasswordDTO) {
        try {
            let admin = await this.prismaService.admin.findUnique(
                {
                    where: {
                        email: payload.email
                    }
                }
            );
            let isPasswordCorrect = await bcrypt.compare(payload.oldPassword, admin.password);
            if (!isPasswordCorrect) return { error: "Incorrect Old Password" };

            if (await bcrypt.compare(payload.newPassword, admin.password)) return { error: "New password cannot be your old password" };
            let hashedPassword = await bcrypt.hash(payload.newPassword, BCRYPT_CONFIG.saltRounds);
            await this.prismaService.admin.update(
                {
                    where: {
                        id: admin.id
                    },
                    data: {
                        password: hashedPassword
                    }
                }
            );
            return { data: "Password Updated Successfully" };
        } catch (error) {
            return { error: error.message };
        }
    }
}
