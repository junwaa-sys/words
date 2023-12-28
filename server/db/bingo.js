const { Mode } = require('@mui/icons-material')
const connection = require('./connection')

function getLiveGames(db = connection) {
  return db('bingo_games')
    .select('id', 'host', 'guest', 'status')
    .where('status', 'active')
}

function addGame(auth0Id, userName, db = connection) {
  return db('bingo_games')
    .insert({
      host: userName,
      host_user_id: auth0Id,
      status: 'active',
    })
    .returning(['id', 'host', 'status'])
}

function deleteGame(gameRoomId, db = connection) {
  return db('bingo_games').delete().where('id', gameRoomId)
}

function getWords(db = connection) {
  return db('words').select()
}

module.exports = { getLiveGames, addGame, getWords, deleteGame }
