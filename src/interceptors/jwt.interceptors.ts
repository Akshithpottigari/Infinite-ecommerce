import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import * as jwt from "jsonwebtoken";
@Injectable()
export class JwtInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const token = request?.headers?.authorization?.split("Bearer ")[1];
    const admin = jwt.decode(token);
    request.admin = admin;
    return next.handle();
  }
}
