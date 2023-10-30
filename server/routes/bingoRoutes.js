const Router = require('express')
const db = require('../db/bingo')
const checkJwt = require('../auth0')

const router = Router()

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

module.exports = router
