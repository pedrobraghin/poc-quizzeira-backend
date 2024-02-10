import { UsersRepository } from './../repository/users.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}
}
