import { AuthService } from './auth.service';
import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBody,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger/dist/decorators';
import { User } from '@prisma/client';
import { UserLoginDto } from 'src/user/dto/user-login.dto';
import { Token } from 'utils/types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Endpoint for authenticate user' })
  @ApiResponse({
    status: 201,
    type: Token,
    description: 'Login token maked successfully',
    isArray: false,
  })
  @ApiResponse({
    status: 401,
    description: 'An error occurred to try login user',
  })
  @ApiBody({ description: 'Login user', type: UserLoginDto })
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req: { user: User }): Promise<Token> {
    return this.authService.login(req.user);
  }
}
