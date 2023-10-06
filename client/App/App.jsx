import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import request from 'superagent'
import { fetchData } from '../features/testSlice'
import { selectTestData } from '../features/testSlice'

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
    <>
      <div>
        <h1>This is from React App component.</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
          <input type="submit" />
        </form>
        <ul>
          {testData.map((data, i) => {
            return <li key={i}>{data}</li>
          })}
        </ul>
      </div>
    </>
  )
}
