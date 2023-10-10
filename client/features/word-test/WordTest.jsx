import React, { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useLocation } from 'react-router-dom'

export default function WordTest() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0()
  const { state } = useLocation()
  const { maxAccuracy, numberOfWord } = state.settings

  return (
    <>
      <h1>State:</h1>
    </>
  )
}
