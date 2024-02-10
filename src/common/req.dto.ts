import { Request as ExpressRequest } from 'express';
import { UserDTO } from 'src/users/dtos/';

export type Request = ExpressRequest & { user: UserDTO };
