import { UserDTO } from '../dtos';

export class UserBuilder {
  static publicUser(user: UserDTO) {
    const { id, name, email, picture } = user;
    return {
      id,
      name,
      email,
      picture,
    };
  }
}
