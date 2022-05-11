import { Users } from '../../entities/users.entity';
import { Connection, getManager } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
const aes256 = require('aes256');
export class UserCreateSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const cipher = aes256.createCipher(process.env.APP_KEY);

    await getManager().query('TRUNCATE users');
    await factory(Users)().create({
      first_name: 'admin',
      last_name: 'admin',
      address: 'Pasig',
      post_code: 4412,
      contact_number: 9112340221,
      email: 'admin@admin.com',
      username: 'admin',
      password: cipher.encrypt('changeme'),
    });
    await factory(Users)().createMany(50);
  }
}
