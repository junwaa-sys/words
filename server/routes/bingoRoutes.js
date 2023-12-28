const Router = require('express')
const db = require('../db/bingo')
const checkJwt = require('../auth0')

const router = Router()

function suffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    let k = array[i]
    array[i] = array[j]
    array[j] = k
  }
  return array
}

router.get('/get', checkJwt, async (req, res) => {
  try {
    // load active games
    const response = await db.getLiveGames()
    res.json(response)
  } catch (error) {
    console.log(error)
  }
})

router.post('/create', checkJwt, async (req, res) => {
  try {
    //call db function to create game
    const auth0Id = req.auth?.payload.sub
    const userName = req.body.userName
    const response = await db.addGame(auth0Id, userName)
    res.json(response)
  } catch (error) {
    console.log(error)
  }
})

router.get('/words/get', async (req, res) => {
  try {
    //load all words and suffle
    const response = await db.getWords()
    const suffledResponse = suffle(response)
    res.json(suffledResponse)
  } catch (error) {
    console.log(error)
  }
})

router.delete('/delete', checkJwt, async (req, res) => {
  try {
    //delete game room in db
    const gameRoomId = req.body.gameRoomId
    const response = await db.deleteGame(gameRoomId)
    res.json(response)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
