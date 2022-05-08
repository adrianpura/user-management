// import { join } from 'path';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

const config: MysqlConnectionOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: 'root',
  password: process.env.DB_PASS,
  database: 'user-management',
  timezone: '+08:00',
  entities: ['dist/src/entities/**/*{.js,.ts}'],
  migrations: ['dist/src/migrations/*{.js,.ts}'],
  synchronize: false,
  cli: {
    migrationsDir: 'src/migrations',
  },
  logging: 'all',
};

export default config;
