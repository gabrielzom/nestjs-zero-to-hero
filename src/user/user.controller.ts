import { UserRetrieveDto } from './dto/user-retrieve.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  UseGuards,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDto } from './dto/user-create.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger/dist/decorators';
import { AuthGuard } from '@nestjs/passport';
import { UserDeletedDto } from './dto/user-deleted.dto';

@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBody({ description: 'Data of register user', type: UserCreateDto })
  @Post()
  async createUser(
    @Body() userCreate: UserCreateDto,
    @Req() req: Request,
  ): Promise<UserRetrieveDto> {
    return this.userService.createUser(
      userCreate,
      req.headers['authorization'],
    );
  }

  @UseGuards(AuthGuard('jwt'))
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
  async getUsers(
    @Query('email') email: string,
    @Query('name') name: string,
    @Query('lastName') lastName: string,
    @Req() req: Request,
  ): Promise<UserRetrieveDto[]> {
    return this.userService.getUsers(
      email,
      name,
      lastName,
      req.headers['authorization'],
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getUserById(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request,
  ): Promise<UserRetrieveDto> {
    return this.userService.getUserById(id, req.headers['authorization']);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() userUpdate: UserUpdateDto,
    @Req() req: Request,
  ): Promise<UserRetrieveDto> {
    return this.userService.updateUser(
      id,
      userUpdate,
      req.headers['authorization'],
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteUser(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request,
  ): Promise<UserDeletedDto> {
    return this.userService.deleteUser(id, req.headers['authorization']);
  }
}
