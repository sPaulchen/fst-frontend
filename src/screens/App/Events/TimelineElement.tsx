import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'

import { makeStyles } from '@mui/styles'
import { Theme, Typography, Link } from '@mui/material'

import { DotObject } from './EventComponent'
import { getTheme } from '~store/settings/settings.selectors'

interface Props {
  element: DotObject
  width?: 'small' | 'big'
}

const TimelineElement: React.FC<Props> = (props) => {
  const theme = useSelector(getTheme)
  const elementWidth: 'small' | 'big' = props.width || 'big'

  const elementWidthValues = {
    big: {
      width: 300,
      height: 200,
    },
    small: {
      width: 200,
      height: 150,
    },
  }

  const [imageWidth, setImageWidth] = React.useState<string>('0')
  const [imageHeight, setImageHeight] = React.useState<string>('0')

  const [active, setActive] = useState<boolean>(props.element.active)

  const [element, setElement] = useState<DotObject>(props.element)

  useEffect(() => {
    setElement(props.element)
    setActive(props.element.active)

    const img = new Image()

    if (props.element.image) {
      img.onload = function () {
        const height = img.height
        const width = img.width
        const ratio = width / height
        if (ratio > 1.5) {
          setImageWidth('auto')
          setImageHeight(`${elementWidthValues[elementWidth].height}px`)
        } else {
          setImageWidth(`${elementWidthValues[elementWidth].width}px`)
          setImageHeight('auto')
        }
      }
      img.src = props.element.image
    }
  }, [props.element],
  )

  const useStyles = makeStyles((theme: Theme) => ({
    elementContainer: {
      width: `${elementWidthValues[elementWidth].width}px`,
      height: `${elementWidthValues[elementWidth].height}px`,
      position: 'relative',
      overflow: 'hidden',
    },
    activeElement: {
      filter: 'grayscale(0%)',
    },
    textOverlay: {
      zIndex: '100',
      position: 'absolute',
      width: `${elementWidthValues[elementWidth].width - 10}px`,
      opacity: '0.8',
      backgroundColor: '#fff',
      padding: '5px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    imageContainer: {
      width: `${elementWidthValues[elementWidth].width - 10}px`,
      height: `${elementWidthValues[elementWidth].height}px`,
      overflow: 'hidden',
    },
    image: {
      width: imageWidth,
      height: imageHeight,
      cursor: 'pointer',
      filter: 'grayscale(100%)',
      '&:hover': {
        filter: 'grayscale(0%)',
      },
    },
    location: {
      textTransform: 'uppercase',
      opacity: '0.8',
      width: '100%',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    },
    description: {
      cursor: 'pointer',
      textTransform: 'uppercase',
      opacity: '0.8',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    },
  }))
  const classes = useStyles()
  const defaultImage = 'images/header.jpg'

  return (
    <div className={classes.elementContainer}>
      <div className={classes.textOverlay}>
        <div className={classes.location}>
          <Typography
            variant='button'
            style={{ fontWeight: '501' }}
          >
            {element.title}
          </Typography>
        </div>
        {(element.caption && element.url) &&
          <Typography variant='caption'>
            <Link
              style={{ textDecoration: 'none' }}
              color={theme.palette.grey[600]}
              href={element.url}
              className={classes.description}
              target='_blank'
            >{element.caption}
            </Link>
          </Typography>}
      </div>
      <div className={`${classes.imageContainer}`}>
        <img
          onMouseEnter={() => setActive(true)}
          onMouseLeave={() => setActive(false)}
          className={`${classes.image} ${active ? classes.activeElement : ''}`}
          src={element.image || defaultImage}
        />
      </div>
    </div>
  )
}

export default TimelineElement
