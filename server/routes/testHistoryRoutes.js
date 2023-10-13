const Router = require('express')
const { auth } = require('express-oauth2-jwt-bearer')
const db = require('../db/testHistory')

const router = Router()

const checkJwt = auth({
  audience: 'https://spell-test/',
  issuerBaseURL: 'https://tohora-2023-joon.au.auth0.com/',
  tokenSigningAlg: 'RS256',
})

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
    console.log(response)
    res.json(response)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
