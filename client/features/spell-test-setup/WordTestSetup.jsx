import React, { useEffect, useState } from 'react'
import TestSetupForm from '../../components/TestSetupForm'
import { loadSettings, addSettings, updateSettings } from './wordTestSetupSlice'
import { useDispatch } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react'

export default function TestSetup() {
  const [token, setToken] = useState('')
  const [selectedNumberOfWord, setSelectedNumberOfWord] = useState(10)
  const [selectedMaxAccuracy, setSelectedMaxAccuracy] = useState(100)
  const [saveType, setSaveType] = useState('new')

  const { user, getAccessTokenSilently } = useAuth0()
  const dispatch = useDispatch()

  useEffect(() => {
    getAccessTokenSilently()
      .then(async (token) => {
        const settings = await dispatch(loadSettings(token))
        setToken(token)
        if (settings.payload.length > 0) {
          setSaveType('update')
          setSelectedNumberOfWord(settings.payload[0].numberOfWord)
          setSelectedMaxAccuracy(settings.payload[0].maxAccuracy)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  async function handleFormSubmit(e) {
    if (saveType === 'new') {
      const response = await dispatch(
        addSettings({
          token,
          numberOfWord: selectedNumberOfWord,
          maxAccuracy: selectedMaxAccuracy,
        })
      )
    } else {
      const response = await dispatch(
        updateSettings({
          token,
          numberOfWord: selectedNumberOfWord,
          maxAccuracy: selectedMaxAccuracy,
        })
      )
    }
  }

  return (
    <TestSetupForm
      numberOfWord={selectedNumberOfWord}
      MaxAccuracy={selectedMaxAccuracy}
      setNumberOfWord={setSelectedNumberOfWord}
      setMaxAccuracy={setSelectedMaxAccuracy}
      handleSubmit={handleFormSubmit}
      buttonLabel={saveType}
    />
  )
}
