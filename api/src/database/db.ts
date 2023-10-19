import knex from 'knex'
import configs from './knexfile';

const config = configs[process.env.NODE_ENV || 'development']

export const TODO_TABLE_NAME = "todos"
export const USERS_TABLE_NAME = "users"

export const database = () => knex(config);

export const databaseTodoTabel = () => database().table(TODO_TABLE_NAME);

export const databaseUsersTabel = () => database().table(USERS_TABLE_NAME);