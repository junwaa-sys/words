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
    clientId="6UkXfbwHPjudSU1TkULstHU2l2UdlodR"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </Auth0Provider>
)
