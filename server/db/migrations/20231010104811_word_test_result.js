/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('word_test_result', (table) => {
    table.increments('id')
    table.integer('word_id')
    table.integer('test_id')
    table.string('result')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('word_test_result')
}
