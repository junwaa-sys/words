import React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import DangerousIcon from '@mui/icons-material/Dangerous'
import { Typography } from '@mui/material'

export default function ResultDialog({
  open,
  setOpen,
  currentIndex,
  setCurrentIndex,
  setIsDisabled,
  setVisible,
  wordCount,
  result,
  testWord,
  answer,
}) {
  const handleClose = () => {
    if (wordCount > currentIndex + 1) {
      setCurrentIndex((prev) => {
        return prev + 1
      })
    } else {
      setIsDisabled(true)
      setVisible('visible')
    }
    setOpen(false)
  }

  return (
    <div>
      <Dialog
        open={open}
        fullWidth
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText
            align="center"
            variant="overline"
            id="alert-dialog-description"
          >
            {result ? (
              <ThumbUpAltIcon color="success" size={'large'} />
            ) : (
              <DangerousIcon color="error" size={'large'} />
            )}
            <br></br>
            {result ? 'Correct' : 'Wrong'}
            <br></br>
            Test Word: {testWord}
            <br></br>
            Your Answer: {answer}
            <br></br>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
