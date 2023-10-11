/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('test_words', (table) => {
    table.increments('id')
    table.integer('test_id')
    table.integer('word_id')
    table.string('answer')
    table.boolean('result')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('test_words')
}
