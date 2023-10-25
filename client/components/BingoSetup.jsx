import React, { useState } from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { Button } from '@mui/material'

export default function BingoSetup() {
  const [size, setSize] = useState(9)

  const handleChange = (event) => {
    setSize(event.target.value)
  }

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="bingo-size">Bingo Size</InputLabel>
        <Select
          labelId="bingo-size"
          id="bingo-size"
          value={size}
          onChange={handleChange}
          label="bingo-size"
        >
          <MenuItem value={9}>3 x 3</MenuItem>
          <MenuItem value={16}>4 x 4</MenuItem>
          <MenuItem value={25}>5 x 5</MenuItem>
        </Select>
        <Button sx={{ m: 2 }}>Create Game</Button>
      </FormControl>
    </div>
  )
}
