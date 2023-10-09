import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Words from '../features/words/Words'
import WordTest from '../features/word-test/WordTest'
import AppLayout from './AppLayout'
import TestHistory from '../features/test-history/TestHistory'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path="/words" element={<Words />} />
          <Route path="/test-history" element={<TestHistory />} />
          <Route path="/word-test" element={<WordTest />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
