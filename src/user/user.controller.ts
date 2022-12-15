import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody } from '@nestjs/swagger/dist/decorators';
import { LoginUserDto } from './dto/login-user.dto';
import { CreatedUserDto } from './dto/created-user.dto';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBody({ description: 'Data of register user', type: CreateUserDto })
  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<CreatedUserDto> {
    return this.userService.createUser(createUserDto);
  }

  @ApiBody({ description: 'Login user', type: LoginUserDto })
  @Post('/login')
  loginUser(@Body() loginUserDto: LoginUserDto): Promise<unknown> {
    return this.userService.loginUser(loginUserDto);
  }

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }
  @Get(':email/get-by-email')
  getUserByEmail(@Param('email') email: string): Promise<User> {
    return this.userService.getUserByEmail(email);
  }

  @Put(':id')
  updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
