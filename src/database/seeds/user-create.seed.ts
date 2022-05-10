import { Users } from 'src/entities/users.entity';
import { Connection, getManager } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

export class UserCreateSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await getManager().query('TRUNCATE users');
    await factory(Users)().create({
      first_name: 'admin',
      last_name: 'admin',
      address: 'Pasig',
      post_code: 4412,
      contact_number: 9112340221,
      email: 'admin@admin.com',
      username: 'admin',
      password: 'changeme',
    });
    await factory(Users)().createMany(50);
  }
}
