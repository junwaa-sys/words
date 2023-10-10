/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('words', (table) => {
    table.increments('id')
    table.string('word')
    table.string('create_user_name')
    table.string('update_user_name')
    table.string('create_user_id')
    table.string('update_user_id')
    table.string('definition')
    table.timestamps(true, true)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('words')
}
