import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody } from '@nestjs/swagger/dist/decorators';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBody({ description: 'Data of register user', type: CreateUserDto })
  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<unknown> {
    return this.usersService.createUser(createUserDto);
  }

  @ApiBody({ description: 'Login user', type: LoginUserDto })
  @Post('/login')
  loginUser(@Body() loginUserDto: LoginUserDto): Promise<unknown> {
    return this.usersService.loginUser(loginUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
