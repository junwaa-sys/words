import React, { useState } from 'react'

import FormControl from '@mui/material/FormControl'
import Input from '@mui/material/Input'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'

export default function NewWordForm({
  word = '',
  label = '',
  setWord,
  setLabel,
  handleSubmit,
}) {
  function handleChange(e) {
    const wordValue = e.target.value
  }

  function handleCancel(e) {
    setLabel('New Word')
    setWord('')
  }

  return (
    <Container
      sx={{
        marginTop: 5,
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
      }}
    >
      <form onSubmit={handleSubmit}>
        <FormControl>
          <TextField
            type="text"
            id="newWord"
            placeholder="Enter Word"
            value={word}
            label={label}
            required
            inputProps={{ pattern: '[A-Za-z]*' }}
            sx={{ marginBottom: 2 }}
            onChange={(e) => setWord(e.target.value)}
          />
          <Container sx={{ display: 'flex', flexDirection: 'row' }}>
            <Button sx={{ m: 1 }} type="submit" variant="outlined">
              {label} Submit
            </Button>
            <Button sx={{ m: 1 }} variant="outlined" onClick={handleCancel}>
              Cancel
            </Button>
          </Container>
        </FormControl>
      </form>
    </Container>
  )
}
