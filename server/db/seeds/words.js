/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('words').del()
  await knex('words').insert([
    { id: 1, word: 'hello', user_id: 'user1' },
    { id: 2, word: 'has', user_id: 'user2' },
    { id: 3, word: 'good', user_id: 'user3' },
  ])
}
