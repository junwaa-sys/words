import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import request from 'superagent'
import { fetchData } from '../features/testSlice'
import { selectTestData } from '../features/testSlice'
import Words from '../features/words/Words'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from './AppLayout'

export default function App() {
  const [data, setData] = useState('')
  const dispatch = useDispatch()
  const testData = useSelector(selectTestData)

  async function addData() {
    const response = await request.get('/api/data/get')
    return response.body
  }

  function handleSubmit(e) {
    e.preventDefault()
    try {
      dispatch(fetchData(data))
      setData('')
    } catch (error) {}
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path="/words" element={<Words />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
