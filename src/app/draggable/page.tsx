'use client'

import React, { CSSProperties, useState } from 'react'
import Draggable, { DraggableEvent } from 'react-draggable'
import Img1 from '../../assets/presskit.jpg'
import Img2 from '../../assets/STILLS_1.jpg'
import Img3 from '../../assets/symposis.jpg'
import styles from './draggable.module.css'
import Image from 'next/image'

type ImageType = {
  url: string
  isFullscreen: boolean
  x: number
  y: number
  width: number
  height: number
}

const DraggablePage = () => {
  const [imageList, setImageList] = useState<ImageType[]>([
    { url: Img1.src, isFullscreen: false, x: 100, y: 100, width: 200, height: 200 },
    { url: Img2.src, isFullscreen: false, x: 200, y: -50, width: 200, height: 200 },
    { url: Img3.src, isFullscreen: false, x: 100, y: -100, width: 400, height: 200 }
  ])
  const [onTop, setOnTop] = useState(3)

  const handleSetOnTop = (e: DraggableEvent) => {
    const element = e.currentTarget as HTMLDivElement
    element.style.zIndex = `${onTop + 1}`
    setOnTop((prev) => ++prev)
  }

  const handleToggleFullscreen = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const element = e.currentTarget as HTMLDivElement

    //make sure to change to isFullscreen inside of the state as well
    setImageList((prev) =>
      prev.map((img) => {
        if (img.url === (element.firstChild as HTMLImageElement).getAttribute('class')) {
          return {
            ...img,
            isFullscreen: !img.isFullscreen
          } as ImageType
        }
        return img
      })
    )

    //check if any of the images have already been double clicked before
    setImageList((prev) =>
      prev.map((img) => {
        if (img.url !== (element.firstChild as HTMLImageElement).getAttribute('class')) {
          return {
            ...img,
            isFullscreen: false
          } as ImageType
        }
        return img
      })
    )
  }

  return (
    <>
      {imageList.map((img, index) => (
        <Draggable
          key={index}
          defaultPosition={{ x: img.x, y: img.y }}
          onStart={(e) => handleSetOnTop(e)}
        >
          <div
            className={styles['img-container']}
            onDoubleClick={(e) => handleToggleFullscreen(e)}
            style={{ width: `${img.width}px`, height: `${img.height}px` }}
          >
            <Image
              src={img.url}
              alt='img'
              width={img.width}
              height={img.height}
              style={
                img.isFullscreen
                  ? { scale: '1.5', transition: 'scale 1s ease-in-out' }
                  : { scale: '1', transition: 'scale 1s ease-in-out' }
              }
              className={img.url}
            />
          </div>
        </Draggable>
      ))}
    </>
  )
}

export default DraggablePage
