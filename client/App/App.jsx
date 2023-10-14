import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Words from '../features/words/Words'
import WordTest from '../features/word-test/WordTest'
import AppLayout from './AppLayout'
import TestHistory from '../features/test-history/TestHistory'
import TestSetup from '../features/test-setup/WordTestSetup'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path="/words" element={<Words />} />
          <Route path="/test-history" element={<TestHistory />} />
          <Route path="/word-test-start" element={<WordTest />} />
          <Route path="/test" element={<TestSetup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
