import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Users } from 'src/entities/users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { Request } from 'express';
@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
  ) {}

  @Post()
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDto: CreateUserDto): Promise<any> {
    return this.usersService.createUser(createUserDto);
  }

  @Patch()
  @UsePipes(ValidationPipe)
  updateUser(@Body() updateUserDto: UpdateUserDto): Promise<any> {
    return this.usersService.updateUser(updateUserDto);
  }

  @Delete('/:id')
  deleteUser(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.usersService.deleteUser(id);
  }

  @Get()
  getUsers(
    @Query(ValidationPipe) filterDto: GetUsersFilterDto,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<Pagination<Users>> {
    const baseUrl = this.configService.get('BASE_URL');
    limit = limit > 100 ? 100 : limit;

    const params = filterDto;
    delete params['page'];
    delete params['limit'];

    const queryString = Object.keys(params)
      .map((key) => key + '=' + filterDto[key])
      .join('&');

    return this.usersService.getAllUsers(filterDto, {
      page,
      limit,
      route: baseUrl + '/users?' + queryString,
    });
  }

  @Post('deleteMultiple')
  @UsePipes(ValidationPipe)
  deleteMultipleUser(@Req() req: Request): Promise<any> {
    return this.usersService.deleteMultipleUser(req);
  }
}
1;
