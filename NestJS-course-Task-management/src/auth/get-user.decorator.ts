import { createParamDecorator } from '@nestjs/common';

import { User } from './user.entity';

/**
 * Custom decorator that will be used to extract the user object (entity) from each request
 */
export const GetUser = createParamDecorator((data, req): User => {
  return req.user;
});
