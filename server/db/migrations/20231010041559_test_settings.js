/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('test_settings', (table) => {
    table.increments('id')
    table.string('user_id')
    table.integer('number_of_word')
    table.double('max_accuracy')
    table.timestamps(true, true)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('test_settings')
}
