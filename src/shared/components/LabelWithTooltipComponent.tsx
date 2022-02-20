/**
 * TooltipComponent
 *
 */

import React from 'react'

import { Theme } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'

import TooltipComponent from './TooltipComponent'
import { makeStyles } from '@mui/styles'

interface Props {
  description?: string
  label: string
  placement?: 'bottom-end'
    | 'bottom-start'
    | 'bottom'
    | 'left-end'
    | 'left-start'
    | 'left'
    | 'right-end'
    | 'right-start'
    | 'right'
    | 'top-end'
    | 'top-start'
    | 'top'
}

const useStyles = makeStyles((theme: Theme) => ({
  tooltipIcon: {
    cursor: 'pointer',
    margin: '0 0 0 5px',
  },
}))

const LabelWithTooltipComponent: React.FC<Props> = (props) => {
  const classes = useStyles()

  return (
    <>
      {props.label}
      {props.description &&
        <TooltipComponent
          title={props.description || 'hallo'}
          element={<InfoIcon className={classes.tooltipIcon} />}
        />}
    </>
  )
}
export default LabelWithTooltipComponent
