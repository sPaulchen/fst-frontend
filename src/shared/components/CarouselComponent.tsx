import React, { useEffect, useRef, useState } from 'react'
import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

export type CarouselItem = {
  id: string
  url: string
}

interface Props {
  images: CarouselItem[]
}

const useStyles = makeStyles((theme: Theme) => ({
  carouselContainer: {
    margin: ' 20px',
  },
  selectedImage: {
    width: '100%',
    height: '500px',
    marginBottom: '8px',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  carousel: {
    position: 'relative',
  },
  carouselImages: {
    display: 'flex',
    maxWidth: '100%',
    overflowX: 'hidden',
  },
  carouselImageSelected: {
    border: '3px solid #ffa700 !important',
  },
  carouselImage: {
    marginRight: '10px',
    height: '150px',
    minWidth: '150px',
    border: '3px solid #ffa70000',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  carouselButton: {
    position: 'absolute',
    top: '40%',
  },
  carouselButtonLeft: {
    left: ' 10px',
  },
  carouselButtonRight: {
    right: '10px',
  },
}))

const CarouselComponent: React.FC<Props> = (props) => {
  const classes = useStyles()
  const images = props.images
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [selectedImage, setSelectedImage] = useState<CarouselItem>()
  const carouselItemsRef = useRef<HTMLDivElement[] | null[]>([])

  useEffect(() => {
    if (images && images[0]) {
      carouselItemsRef.current = carouselItemsRef.current.slice(
        0,
        images.length,
      )

      setSelectedImageIndex(0)
      setSelectedImage(images[0])
    }
  }, [images])

  const handleSelectedImageChange = (newIdx: number) => {
    if (images && images.length > 0) {
      setSelectedImage(images[newIdx])
      setSelectedImageIndex(newIdx)
      if (carouselItemsRef?.current[newIdx]) {
        carouselItemsRef?.current[newIdx]?.scrollIntoView({
          inline: 'center',
          behavior: 'smooth',
        })
      }
    }
  }

  const handleRightClick = () => {
    if (images && images.length > 0) {
      let newIdx = selectedImageIndex + 1
      if (newIdx >= images.length) {
        newIdx = 0
      }
      handleSelectedImageChange(newIdx)
    }
  }

  const handleLeftClick = () => {
    if (images && images.length > 0) {
      let newIdx = selectedImageIndex - 1
      if (newIdx < 0) {
        newIdx = images.length - 1
      }
      handleSelectedImageChange(newIdx)
    }
  }

  return (
    <div className={classes.carouselContainer}>
      <div
        className={classes.selectedImage}
        style={{ backgroundImage: `url(${selectedImage?.url})` }}
      />
      <div className={classes.carousel}>
        <div className={classes.carouselImages}>
          {images &&
          images.map((image, idx) => (
            <div
              onClick={() => handleSelectedImageChange(idx)}
              style={{ backgroundImage: `url(${image.url})` }}
              key={image.id}
              className={`${classes.carouselImage} ${
                selectedImageIndex === idx && classes.carouselImageSelected}`}
              ref={(el) => (carouselItemsRef.current[idx] = el)}
            />
          ))}
        </div>
        <button
          className={`${classes.carouselButton} ${classes.carouselButtonLeft}`}
          onClick={handleLeftClick}
        >
          Prev
        </button>
        <button
          className={`${classes.carouselButton} ${classes.carouselButtonRight}`}
          onClick={handleRightClick}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default CarouselComponent
