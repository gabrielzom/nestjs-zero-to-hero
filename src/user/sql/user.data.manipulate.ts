import { CreateUserDto } from '../dto/create-user.dto';
import * as process from 'process';

export class UserDataManipulate {
  static createUser(createUserDto: CreateUserDto): string {
    return `INSERT INTO tab_users (
      name, 
      last_name, 
      email, 
      role,
      password 
    ) VALUES (
      '${createUserDto.name.toUpperCase()}',
      '${createUserDto.lastName.toUpperCase()}',
      '${createUserDto.email.toLowerCase()}',
      '${createUserDto.role}',
      AES_ENCRYPT(
        '${createUserDto.password}', 
        '${process.env.AES_KEY}'
      )
    )`;
  }
}
