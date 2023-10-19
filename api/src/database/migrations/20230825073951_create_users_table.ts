import { Knex } from "knex";
import { USERS_TABLE_NAME } from "../db";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(USERS_TABLE_NAME, (tabel) => {
    tabel.increments("id").primary();
    tabel.string("userName", 16).notNullable();
    tabel.string("email").notNullable();
    tabel.string("password", 255).notNullable();
    tabel.string("createdAt");
    tabel.string("lastLogin");
    tabel.string("sessionId");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(USERS_TABLE_NAME);
}
