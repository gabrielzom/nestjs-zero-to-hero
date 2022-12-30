import { LoginUserDto } from '../dto/login-user.dto';
import * as process from 'process';

export class UserDataQuery {
  static verifyPassword(loginUserDto: LoginUserDto): string {
    return `
    SELECT 
      name,
      last_name AS lastName,
      email, 
      role,
      password
    FROM tab_users 
    WHERE 
      CAST(
        AES_DECRYPT(
          password, 
          '${process.env.AES_KEY}'
        ) AS CHAR
      ) = '${loginUserDto.password}'
    AND email = '${loginUserDto.email}'
  `;
  }
}
