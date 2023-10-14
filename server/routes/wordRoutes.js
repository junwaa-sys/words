const Router = require('express')
const { auth } = require('express-oauth2-jwt-bearer')
const db = require('../db/words')
const checkJwt = require('../auth0')

const router = Router()

router.get('/get', checkJwt, async (req, res) => {
  try {
    const response = await db.getWords()
    res.json(response)
  } catch (error) {
    console.log(error)
  }
})

router.post('/add', checkJwt, async (req, res) => {
  try {
    const userId = req.auth?.payload.sub
    const word = req.body.word
    const userName = req.body.userName
    const response = await db.addWord(userId, userName, word)

    res.json(response)
  } catch (error) {
    console.log(error)
  }
})

router.put('/edit/:id', checkJwt, async (req, res) => {
  try {
    const userId = req.auth?.payload.sub
    const word = req.body.word
    const userName = req.body.userName
    const wordId = req.params.id
    const response = await db.updateWord(userId, userName, word, wordId)
    res.json(response)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
