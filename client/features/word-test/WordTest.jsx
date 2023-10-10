import React, { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

export default function WordTest() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0()

  return <></>
}
