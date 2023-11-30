// Usage: @UseGuards(AuthGuard)
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
import { Observable } from 'rxjs';
import { PrismaService } from '../prisma.service';
import { Admin } from '../types';
import { IS_PUBLIC_KEY } from '../decorators/isPublic.decorator';
import { JWT_CONFIG } from '../constants';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly prisma: PrismaService,
    ) { }
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
                context.getHandler(),
                context.getClass(),
            ]);
            if (isPublic) {
                // 💡 See this condition
                return true;
            }
            const request = context.switchToHttp().getRequest();
            const token = request?.headers?.authorization?.split('Bearer ')[1];
            if (!token) {
                return false;
            }
            const user = jwt.verify(token, JWT_CONFIG.SECRET) as Admin;
            request.admin = user;
            // return this.matchRoles(roles, user.id, user.role);
            return true;
        } catch (error) {
            return false;
        }
    }
    // async matchRoles(roles: Role[], userId: string, role: Role) {
    //     try {
    //         const user = role == "USER" ? await this.prisma.user.findUnique({
    //             where: { id: userId },
    //         }) : await this.prisma.admin.findUnique({
    //             where: { id: userId },
    //         });
    //         if (!user) return false;
    //         return roles.includes(user?.role);
    //     } catch (error) {
    //         return false;
    //     }
    // }
}