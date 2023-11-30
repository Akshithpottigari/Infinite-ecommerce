import { Controller, Post, Get, Delete, Put, Body, Param } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDTO } from './dtos/createAdmin.dto';
import { User } from '../decorators/user.decorator';
import { Admin } from '../types';
import { Public } from '../decorators/isPublic.decorator';
import { UpdateAdminDTO } from './dtos/updateAdmin.dto';
import { AdminLoginDTO } from './dtos/adminLogin.dto';
import { ResetPasswordDTO } from './dtos/resetPassword.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @Public()
  @Post("create")
  async createAdmin(@Body() body: CreateAdminDTO) {
    return await this.adminService.createAdmin(body)
  }

  @Public()
  @Post("login")
  async login(@Body() body: AdminLoginDTO) {
    return await this.adminService.login(body);
  }

  @Get("me")
  async getAdminInfo(@User() admin: Admin) {
    return await this.adminService.getAdminInfo(admin)
  }

  @Put("update")
  async updateAdmin(@Body() body: UpdateAdminDTO, @User() admin: Admin) {
    return await this.adminService.updateAdmin(body, admin);
  }

  @Public()
  @Put("reset-password")
  async resetPassword(@Body() body: ResetPasswordDTO) {
    return await this.adminService.resetPassword(body)
  }
}
