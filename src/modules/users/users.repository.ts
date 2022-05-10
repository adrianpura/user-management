import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { Users } from 'src/entities/users.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';
const aes256 = require('aes256');
import * as crypto from 'crypto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';

@EntityRepository(Users)
export class UsersRepository extends Repository<Users> {
  async createUser(createUserDto: CreateUserDto): Promise<Users> {
    const cipher = aes256.createCipher(process.env.APP_KEY);
    const {
      first_name,
      last_name,
      address,
      post_code,
      contact_number,
      email,
      username,
      password,
    } = createUserDto;

    const user = new Users();
    user.first_name = cipher.encrypt(first_name);
    user.last_name = cipher.encrypt(last_name);
    user.address = address;
    user.post_code = post_code;
    user.contact_number = contact_number;
    user.email = email;
    user.username = username;
    user.address = address;

    user.password = crypto
      .createHash('sha256')
      .update(password)
      .digest('base64');

    try {
      await user.save();
    } catch (e) {
      if (e.code === '23505' || e.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('user already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }

    return user;
  }

  async getById(id: number): Promise<Users> {
    const query = this.createQueryBuilder('users');

    query.andWhere('users.id = :id', { id });

    return await query.getOne();
  }

  async deleteUser(id: number) {
    const query = await this.createQueryBuilder('users')
      .delete()
      .from(Users)
      .where('id = :id', { id })
      .execute();
    return query;
  }

  async deleteMultiple(ids: string) {
    const query = await this.createQueryBuilder('users')
      .delete()
      .from(Users)
      .where('id IN (:...ids)', { ids: ids })
      .execute();
    return query;
  }

  async updateUser(user: Users, updateUserDto: UpdateUserDto): Promise<Users> {
    const cipher = aes256.createCipher(process.env.APP_KEY);
    const {
      first_name,
      last_name,
      address,
      post_code,
      contact_number,
      email,
      username,
    } = updateUserDto;

    if (first_name) {
      user.first_name = cipher.encrypt(first_name);
    }

    if (last_name) {
      user.last_name = cipher.encrypt(last_name);
    }

    if (address) {
      user.address = address;
    }

    if (post_code) {
      user.post_code = post_code;
    }

    if (post_code) {
      user.post_code = post_code;
    }

    if (contact_number) {
      user.contact_number = contact_number;
    }

    if (email) {
      user.email = email;
    }

    if (username) {
      user.username = username;
    }

    try {
      await user.save();
    } catch (e) {
      console.log(e.code);
      throw new InternalServerErrorException();
    }

    return user;
  }

  async getAllUsers(
    filterDto: GetUsersFilterDto,
    options: IPaginationOptions,
  ): Promise<Pagination<Users>> {
    const query = this.createQueryBuilder('users');

    return await paginate<Users>(query, options);
  }
}
