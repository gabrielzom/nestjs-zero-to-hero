import { LoginUserDto } from '../dto/login-user.dto';
import * as process from 'process';

export class UserDataQuery {
  static getUsersORM(email?: string, name?: string, lastName?: string): object {
    const mainClause = 'where';
    let clause: string;
    let query: object = {};
    if (email) {
      query = {
        [mainClause]: {
          email: {
            startsWith: email,
          },
        },
      };
      clause = 'AND';
    }
    if (name) {
      !!clause
        ? (query[mainClause][clause] = {
            name: {
              startsWith: name,
            },
          })
        : (query[mainClause] = {
            name: {
              startsWith: name,
            },
          });
      clause = 'AND';
    }
    if (lastName) {
      !!clause
        ? (query[mainClause][clause] = {
            lastName: {
              startsWith: lastName,
            },
          })
        : (query[mainClause] = {
            lastName: {
              startsWith: lastName,
            },
          });
    }
    return query;
  }
  static verifyPasswordSQL(loginUserDto: LoginUserDto): string {
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
