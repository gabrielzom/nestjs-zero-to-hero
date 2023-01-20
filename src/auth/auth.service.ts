import { UserLoginDto } from '../user/dto/user-login.dto';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { Token } from 'utils/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: User): Promise<Token> {
    const { password, iv, ...payload } = user;
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async validateUser(userLogin: UserLoginDto): Promise<User> {
    const user: User = await this.userService.loginUser(userLogin);
    return user;
  }
}
