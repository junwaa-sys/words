/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('test_history', (table) => {
    table.increments('id')
    table.string('test_date')
    table.number('user_id')
    table.string('result')
    table.number('accuracy')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('test_history')
}
