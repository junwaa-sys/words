import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { Auth0Provider } from '@auth0/auth0-react'
import App from './App/App'
import store from './App/store'

const root = createRoot(document.getElementById('app'))
root.render(
  <Auth0Provider
    domain="tohora-2023-joon.au.auth0.com"
    clientId="9bU441MqvapJHuwA1Yp7gSbrvwnFUc34"
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: 'https://spell-test/',
    }}
  >
    <Provider store={store}>
      <App />
    </Provider>
  </Auth0Provider>
)
