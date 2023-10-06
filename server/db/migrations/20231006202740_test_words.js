/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('test_words', (table) => {
    table.increments('id')
    table.number('test_id')
    table.number('word_id')
    table.string('answer')
    table.boolean('correct')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('test_words')
}
