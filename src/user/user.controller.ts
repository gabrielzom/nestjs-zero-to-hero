import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiQuery } from '@nestjs/swagger/dist/decorators';
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

  @ApiQuery({
    name: 'email',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'name',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'lastName',
    required: false,
    type: String,
  })
  @Get()
  getUsers(
    @Query('email') email: string,
    @Query('name') name: string,
    @Query('lastName') lastName: string,
  ): Promise<User[]> {
    return this.userService.getUsers(email, name, lastName);
  }

  @Get(':id')
  getUserById(@Param('id') id: number): Promise<User> {
    return this.userService.getUserById(id);
  }
  @Get(':email/get-by-email')
  getUserByEmail(@Param('email') email: string): Promise<User> {
    return this.userService.getUserByEmail(email);
  }

  @Put(':id')
  updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number): Promise<User> {
    return this.userService.deleteUser(id);
  }
}
