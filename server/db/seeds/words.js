/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('words').del()
  await knex('words').insert([
    { word: 'hello', user_id: 'user1' },
    { word: 'hello', user_id: 'user1' },
    { word: 'hello', user_id: 'user1' },
    { word: 'hello', user_id: 'user1' },
    { word: 'hello', user_id: 'user1' },
    { word: 'hello', user_id: 'user1' },
    { word: 'hello', user_id: 'user1' },
    { word: 'hello', user_id: 'user1' },
    { word: 'hello', user_id: 'user1' },
    { word: 'hello', user_id: 'user1' },
    { word: 'hello', user_id: 'user1' },
    { word: 'hello', user_id: 'user1' },
    { word: 'hello', user_id: 'user1' },
    { word: 'hello', user_id: 'user1' },
    { word: 'hello', user_id: 'user1' },
    { word: 'hello', user_id: 'user1' },
    { word: 'hello', user_id: 'user1' },
    { word: 'hello', user_id: 'user1' },
  ])
}
