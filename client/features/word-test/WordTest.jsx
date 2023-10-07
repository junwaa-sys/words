import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

export default function WordTest() {
  const { loginWithRedirect } = useAuth0()

  return <button onClick={() => loginWithRedirect()}>LOG IN</button>
}
