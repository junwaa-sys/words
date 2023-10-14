const { auth } = require('express-oauth2-jwt-bearer')

const checkJwt = auth({
  audience: 'https://spell-test/',
  issuerBaseURL: 'https://tohora-2023-joon.au.auth0.com/',
  tokenSigningAlg: 'RS256',
})

module.exports = checkJwt
