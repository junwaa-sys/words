import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 30,
  p: 4,
}

export default function BingoWordModal({
  open,
  handleClose,
  addWord,
  words,
  gridIndex,
}) {
  const cards = words.map((word) => {
    return (
      <Grid key={word.id} item xs={4}>
        <Card>
          <CardContent>
            <Typography sx={{ fontSize: 15 }} color="text.primary" gutterBottom>
              {word.word}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              onClick={() => {
                addWord({
                  gridIndex: gridIndex,
                  wordId: word.id,
                  word: word.word,
                })
              }}
            >
              ADD
            </Button>
          </CardActions>
        </Card>
      </Grid>
    )
  })

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll="paper"
      aria-labelledby="words"
      aria-describedby="words-for-bingo"
    >
      <DialogTitle id="words">Bingo Words</DialogTitle>
      <DialogContent dividers={scroll === 'paper'}>
        <Grid container spacing={2}>
          {cards}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
    // <Modal
    //   open={open}
    //   onClose={handleClose}
    //   aria-labelledby="bingo-word-modal"
    //   aria-describedby="modal-bingo-word"
    // >
    //   <Box sx={style}>
    //     <Typography id="modal-modal-title" variant="h6" component="h2">
    //       Choose word to add
    //     </Typography>
    //   </Box>
    // </Modal>
  )
}
