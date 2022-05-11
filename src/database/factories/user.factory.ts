import {
  randAddress,
  randCity,
  randEmail,
  randFirstName,
  randFullName,
  randLastName,
  randNumber,
  randPassword,
  randUserName,
  randZipCode,
} from '@ngneat/falso';
import { Users } from '../../entities/users.entity';
import { define } from 'typeorm-seeding';
const aes256 = require('aes256');
import * as crypto from 'crypto';

define(Users, () => {
  const cipher = aes256.createCipher(process.env.APP_KEY);
  const user = new Users();
  user.first_name = cipher.encrypt(randFirstName());
  user.last_name = cipher.encrypt(randLastName());
  user.address = randCity();
  user.post_code = 1234; // randZipCode({ length: 4 });
  user.contact_number = randNumber();
  user.email = randEmail();
  user.username = randUserName();
  user.password = cipher.encrypt(randPassword());
  return user;
});
