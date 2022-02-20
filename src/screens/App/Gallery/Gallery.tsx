import React from 'react'
import CarouselComponent, { CarouselItem } from '~shared/components/CarouselComponent'

const Gallery: React.FC = () => {
  const images: CarouselItem[] = [
    {
      id: '001',
      url: 'images/test.jpg',
    },
    {
      id: '002',
      url: 'images/test.jpg',
    },
  ]

  return (
    <div>Hier kommen Bilder rein</div>
    // <CarouselComponent images={images} />
  )
}

export default Gallery
