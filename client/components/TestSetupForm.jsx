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
  isDisabled,
}) {
  return (
    <>
      <FormControl sx={{ m: 2 }}>
        <InputLabel id="number-of-word">Number of Word</InputLabel>
        <Select
          sx={{ width: 150 }}
          size="large"
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
      <FormControl sx={{ m: 2 }}>
        <InputLabel id="max-accuracy">Max Accuracy</InputLabel>
        <Select
          size="large"
          sx={{ width: 150 }}
          labelId="max-accuracy"
          id="max-accuracy"
          name="max-accuracy"
          value={MaxAccuracy}
          label="Max Accuracy"
          onChange={(e) => setMaxAccuracy(e.target.value)}
        >
          <MenuItem value={0.5}>50%</MenuItem>
          <MenuItem value={0.6}>60%</MenuItem>
          <MenuItem value={0.7}>70%</MenuItem>
          <MenuItem value={0.8}>80%</MenuItem>
          <MenuItem value={0.9}>90%</MenuItem>
          <MenuItem value={1}>100%</MenuItem>
        </Select>
      </FormControl>
      <FormControl
        fullWidth
        sx={{ m: 2, display: 'flex', alignItems: 'center' }}
      >
        <Button
          sx={{ m: 1, width: 150 }}
          variant="outlined"
          onClick={handleSubmit}
        >
          Save settings
        </Button>
        <Button
          sx={{ m: 1, width: 150 }}
          variant="outlined"
          onClick={handleGoTo}
          disabled={isDisabled}
        >
          Go to Test
        </Button>
      </FormControl>
    </>
  )
}
