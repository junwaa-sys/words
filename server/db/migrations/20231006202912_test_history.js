/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('test_history', (table) => {
    table.increments('id')
    table.string('test_date')
    table.integer('user_id')
    table.string('result')
    table.double('accuracy')
    table.timestamps(true, true)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('test_history')
}
