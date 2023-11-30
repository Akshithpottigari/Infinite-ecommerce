import { ExecutionContext, SetMetadata, createParamDecorator } from '@nestjs/common';
import { Admin } from '../types';

export const User = createParamDecorator((data, context: ExecutionContext) => {
    // Getting user from request
    const request = context.switchToHttp().getRequest();
    return request.admin as Admin;
})
