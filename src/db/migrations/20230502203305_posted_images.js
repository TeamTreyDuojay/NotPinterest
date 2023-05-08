/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => knex.schema.createTable('posted_images', (table) => {
    table.increments('id');
    table.string('img_url').notNullable();
    table.integer('user_id').notNullable();
    table.foreign('user_id').references('id').inTable('users');
  });
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = (knex) => knex.schema.dropTable('posted_images');
  