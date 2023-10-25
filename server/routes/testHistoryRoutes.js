const Router = require('express')
const db = require('../db/testHistory')
const checkJwt = require('../auth0')

const router = Router()

router.get('/get', checkJwt, async (req, res) => {
  const userId = req.auth?.payload.sub

  try {
    //fetch history list
    const response = await db.getHistoryByUserId(userId)
    res.json(response)
  } catch (error) {
    console.log(error)
  }
})

router.get('/byword/get', checkJwt, async (req, res) => {
  const userId = req.auth?.payload.sub

  try {
    const response = await db.getRecordsByWord(userId)
    res.json(response)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
