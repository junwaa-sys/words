import * as React from 'react'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'

export default function TestRecordTypeButton({ handleClick }) {
  return (
    <ButtonGroup
      sx={{ m: 2 }}
      variant="contained"
      aria-label="outlined primary button group"
    >
      <Button id="total" onClick={(e) => handleClick(e.target.id)}>
        Total
      </Button>
      <Button id="word" onClick={(e) => handleClick(e.target.id)}>
        Word
      </Button>
    </ButtonGroup>
  )
}
