import * as bcrypt from 'bcrypt';

export class PasswordUtils {
  static async hashPass(password: string) {
    return await bcrypt.hash(password, 12);
  }

  static async comparePare(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }
}
