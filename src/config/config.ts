export const config = () => ({
  database: {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    timezone: '+08:00',
    entities: ['dist/src/entities/**/*{.js,.ts}'],
    migrations: ['dist/src/migrations/*{.js,.ts}'],
    cli: {
      migrationsDir: 'src/migrations',
    },
    keepConnectionAlive: true,
    synchronize: false,
    logging: false,
    extra: {
      charset: 'utf8mb4_unicode_ci',
    },
  },
});
