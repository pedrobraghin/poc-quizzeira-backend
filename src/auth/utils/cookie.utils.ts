import { Response } from 'express';

export class CookieUtils {
  static setAccesTokenCookie(token: string, res: Response) {
    const ONE_DAY = 1000 * 60 * 60 * 24;
    const expiresIn = Number(process.env.SESSION_COOKIE_EXPIRES_IN);
    const maxAge = Date.now() + expiresIn * ONE_DAY;

    const secure = process.env.NODE_ENV === 'production';

    res.cookie('access_token', token, {
      maxAge,
      sameSite: true,
      secure,
      path: '/',
      httpOnly: true,
    });
  }

  static logOut(res: Response) {
    res.clearCookie('access_token');
    return;
  }
}
