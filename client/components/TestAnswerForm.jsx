import { Button, FormControl, Input } from '@mui/material'
import React from 'react'

export default function AnswerInput({ handleSubmit, answer, setAnswer }) {
  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <Input
          value={answer}
          onChange={(e) => {
            setAnswer(e.target.value)
          }}
          placeholder="Enter Answer Here"
          required
          inputProps={{ pattern: '[A-Za-z]*' }}
        />
        <Button type="submit">Submit</Button>
      </FormControl>
    </form>
  )
}
