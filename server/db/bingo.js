const { Mode } = require('@mui/icons-material')
const connection = require('./connection')

function getLiveGames(db = connection) {
  return db('bingo_games')
    .select('id', 'host', 'status')
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

module.exports = { getLiveGames, addGame }
