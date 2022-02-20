import React from 'react'

import { IconButton, InputAdornment } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

interface Props {
  onTrashClick: (event: React.MouseEvent) => void
}

const TextInputTrash: React.FC<Props> = (props: Props) => {
  return (
    <InputAdornment
      onClick={(event: React.MouseEvent) => props.onTrashClick(event)}
      position='end'
    >
      <IconButton
        aria-label='delete'
      >
        <DeleteIcon />
      </IconButton>
    </InputAdornment>
  )
}

export default TextInputTrash
