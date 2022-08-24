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
import { ApiBody, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserResponseDto } from './dto/create-user-response.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Endpoint for create user' })
  @ApiResponse({
    status: 200,
    type: CreateUserResponseDto,
    description: 'Tasks returneds',
    isArray: true,
  })
  @ApiResponse({
    status: 400,
    description: 'There has been an error. The query was not possible',
  })
  @ApiBody({
    description: 'Data of register user',
    type: CreateUserDto,
  })
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
