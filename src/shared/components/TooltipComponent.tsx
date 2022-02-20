/**
 * TooltipComponent
 *
 */

import React from 'react'

import { Tooltip } from '@mui/material'

interface Props {
  title: string
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
  element: JSX.Element
}

const TooltipComponent: React.FC<Props> = (props) => {
  return (
    <Tooltip
      title={props.title}
      placement={props.placement || 'right'}
    >
      {props.element}
    </Tooltip>
  )
}
export default TooltipComponent
