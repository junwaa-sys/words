/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('bingo_games', (table) => {
    table.increments('id')
    table.string('host')
    table.string('host_user_id')
    table.string('guest')
    table.string('guest_user_id')
    table.string('status')
    table.timestamps(true, true)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('bingo_games')
}
