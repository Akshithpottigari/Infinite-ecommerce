import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { PrismaService } from '../prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONFIG } from '../constants';

@Module({
  imports: [JwtModule.register({
    global: true,
    secret: JWT_CONFIG.SECRET,
  }),],
  controllers: [AdminController,],
  providers: [AdminService, PrismaService],
})
export class AdminModule { }
