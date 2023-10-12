/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('word_accuracy', (table) => {
    table.increments('id')
    table.string('user_id')
    table.integer('word_id')
    table.integer('total_tests')
    table.integer('correct_tests')
    table.double('accuracy')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('word_accuracy')
}
