import React from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'

export default function TestSetupForm({
  numberOfWord,
  MaxAccuracy,
  setNumberOfWord,
  setMaxAccuracy,
  handleSubmit,
  buttonLabel,
  handleGoTo,
}) {
  return (
    <>
      <FormControl fullWidth sx={{ m: 2, minWidth: 60 }}>
        <InputLabel id="number-of-word">Number of Word</InputLabel>
        <Select
          size="small"
          labelId="number-of-word"
          id="number-of-word"
          name="number-of-word"
          value={numberOfWord}
          label="Number of Word"
          onChange={(e) => setNumberOfWord(e.target.value)}
        >
          <MenuItem value={10}>10 Words</MenuItem>
          <MenuItem value={15}>15 Words</MenuItem>
          <MenuItem value={20}>20 Words</MenuItem>
          <MenuItem value={25}>25 Words</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ m: 2 }}>
        <InputLabel id="max-accuracy">Max Accuracy</InputLabel>
        <Select
          size="small"
          labelId="max-accuracy"
          id="max-accuracy"
          name="max-accuracy"
          value={MaxAccuracy}
          label="Max Accuracy"
          onChange={(e) => setMaxAccuracy(e.target.value)}
        >
          <MenuItem value={50}>50%</MenuItem>
          <MenuItem value={60}>60%</MenuItem>
          <MenuItem value={70}>70%</MenuItem>
          <MenuItem value={80}>80%</MenuItem>
          <MenuItem value={90}>90%</MenuItem>
          <MenuItem value={100}>100%</MenuItem>
        </Select>
        <Container sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button sx={{ m: 1 }} variant="outlined" onClick={handleSubmit}>
            {buttonLabel}
          </Button>
        </Container>
      </FormControl>
      <Button variant="outlined" onClick={handleGoTo}>
        Go to Test
      </Button>
    </>
  )
}
