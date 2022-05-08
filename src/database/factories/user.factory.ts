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
import { Users } from 'src/entities/users.entity';
import { define } from 'typeorm-seeding';

define(Users, () => {
  const user = new Users();
  user.first_name = randFirstName();
  user.last_name = randLastName();
  user.address = randCity();
  user.post_code = 1234; // randZipCode({ length: 4 });
  user.contact_number = randNumber();
  user.email = randEmail();
  user.username = randUserName();
  user.password = randPassword();
  return user;
});
