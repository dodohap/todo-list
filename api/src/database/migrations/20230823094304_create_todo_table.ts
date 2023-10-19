import { Knex } from "knex";
import { TODO_TABLE_NAME } from "../db";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TODO_TABLE_NAME, (tabel) => {
    tabel.increments("id").primary();
    tabel.integer("userId").notNullable();
    tabel.string("description").notNullable();
    tabel.string("status").defaultTo("Do zrobienia");
    tabel.string("createdAt");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TODO_TABLE_NAME);
}
