import { Button, FormControl, Input } from '@mui/material'
import React from 'react'

export default function AnswerInput({
  handleSubmit,
  answer,
  setAnswer,
  isDisabled,
}) {
  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 10 }}>
      <FormControl disabled={isDisabled}>
        <Input
          value={answer}
          onChange={(e) => {
            setAnswer(e.target.value)
          }}
          placeholder="Enter Answer Here"
          required
          inputProps={{ pattern: '[A-Za-z]*' }}
        />
        <Button type="submit" disabled={isDisabled}>
          Submit
        </Button>
      </FormControl>
    </form>
  )
}
