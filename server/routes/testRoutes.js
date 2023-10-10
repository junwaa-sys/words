const Router = require('express')
const { auth } = require('express-oauth2-jwt-bearer')
const db = require('../db/db')

const router = Router()

const checkJwt = auth({
  audience: 'https://spell-test/',
  issuerBaseURL: 'https://tohora-2023-joon.au.auth0.com/',
  tokenSigningAlg: 'RS256',
})

router.get('/setting/get', checkJwt, async (req, res) => {
  const userId = req.auth?.payload.sub
  try {
    const response = await db.getTestSettings(userId)
    res.json(response)
  } catch (error) {
    console.log(error)
  }
})

router.post('/setting/add', checkJwt, async (req, res) => {
  const userId = req.auth?.payload.sub
  const numberOfWord = req.body.numberOfWord
  const maxAccuracy = req.body.maxAccuracy

  try {
    const addedSetting = await db.addTestSetting(
      userId,
      numberOfWord,
      maxAccuracy
    )
    res.json(addedSetting)
  } catch (error) {
    console.log(error)
  }
})

router.put('/setting/update', checkJwt, async (req, res) => {
  const userId = req.auth?.payload.sub
  const numberOfWord = req.body.numberOfWord
  const maxAccuracy = req.body.maxAccuracy
  try {
    const response = await db.updateTestSetting(
      userId,
      numberOfWord,
      maxAccuracy
    )
    res.json(response)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
