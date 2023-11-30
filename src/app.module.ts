import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { PrismaService } from './prisma.service';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtInterceptor } from './interceptors/jwt.interceptors';
import { AuthGuard } from './guards/auth.guard';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [AdminModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService, PrismaService,
    {
      provide: APP_INTERCEPTOR,
      useClass: JwtInterceptor
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ],
})
export class AppModule { }
