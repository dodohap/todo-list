import { Knex } from "knex";
import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } from '../config/index';
// Update with your config settings.

const configs: { [key: string]: Knex.Config } = {
  development: {
    client: 'mysql2',
    connection: {
      charset: 'utf8',
      user: "root",
      password: "password",
      host: "localhost",
      port: 3306,
      database: "todoapp",
    },
    migrations: {
      directory: './migrations',
      tableName: 'migrations',
    },
  }
};

export default configs;
