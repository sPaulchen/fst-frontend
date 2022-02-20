import React, { useEffect, useState } from 'react'

import { makeStyles } from '@mui/styles'
import { Theme, Typography } from '@mui/material'

const useStyles = makeStyles((theme: Theme) => ({
  dot: {
    cursor: 'pointer',
    width: '30px',
    height: '30px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.primary.main,
  },
  activeDot: {
    color: theme.palette.secondary.main,
  },
}))

interface Props {
  year: number
  active: boolean
}

const TimelineDotComponent: React.FC<Props> = (props) => {
  const classes = useStyles()
  const [active, setActive] = useState<boolean>(props.active)
  const [year, setYear] = useState<number>(props.year)

  useEffect(() => {
    setActive(props.active)
  }, [props.active],
  )

  useEffect(() => {
    setYear(props.year)
  }, [props.year],
  )
  return (
    <div
      className={classes.dot}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <Typography className={active ? classes.activeDot : ''}>{year}</Typography>
    </div>
  )
}

export default TimelineDotComponent
