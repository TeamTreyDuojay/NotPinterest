/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => knex.schema.createTable('saved_images', (table) => {
    table.increments('id');
    table.string('img_url').notNullable();
    table.integer('user_id').notNullable().unique();
    table.foreign('user_id').references('id').inTable('users');
  });
  
    
    /**
     * @param { import("knex").Knex } knex
     * @returns { Promise<void> }
     */
    exports.down = (knex) => knex.schema.dropTable('saved_images');
    