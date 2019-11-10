import React, { useEffect, useState, useRef } from 'react'
import anime from 'animejs'

import styles from './carousel.scss'
import { classNames } from '../shared/utils'

let windowWidth = null
const maxVelocity = 3

const move = callback => startEvent => {
  const xStart = startEvent.changedTouches[0].clientX
  const timeStart = performance.now()

  startEvent.target.addEventListener(
    'touchend',
    endEvent => {
      const distance = xStart - endEvent.changedTouches[0].clientX
      const timeEnd = performance.now()
      const velocity = Math.abs(distance / (timeStart - timeEnd))

      callback(Math.sign(distance), velocity)
    },
    { once: true }
  )
}

const Slide = ({ children }) => {
  return <div className={styles.slide}>{children}</div>
}

const Carousel = ({ children, ...props }) => {
  const slidesLength = children.length
  const carouselRef = useRef()
  const [{ activeSlideIndex, velocity }, setState] = useState({
    activeSlideIndex: Math.round(slidesLength / 2) - 1,
    velocity: null
  })

  if (velocity > maxVelocity) {
    setState({
      velocity: maxVelocity
    })
  }

  useEffect(() => {
    const slides = [...carouselRef.current.children]

    windowWidth = windowWidth || window.innerWidth

    anime({
      targets: carouselRef.current,
      scale: {
        value: [0.8, 1],
        easing: 'spring(0.4, 80, 30, 0.8)'
      },
      easing: `spring(1, 100, 30, ${
        velocity ? ((velocity / maxVelocity) * 100) / 2 : 0
      })`,
      translateX: -(windowWidth * activeSlideIndex) - 15
    })
  }, [activeSlideIndex])

  const handleMove = (sign, velocity) => {
    const nextSlideIndex = activeSlideIndex + sign

    if (nextSlideIndex >= 0 && nextSlideIndex < slidesLength) {
      setState({
        velocity,
        activeSlideIndex: nextSlideIndex
      })
    }
  }

  return (
    <div
      {...props}
      {...classNames(styles.container, props.className)}
      onTouchStart={move(handleMove)}>
      <div
        ref={carouselRef}
        className={styles.carousel}
        style={{
          width: `${100 * children.length}vw`
        }}>
        {children.map((child, i) => (
          <Slide key={i}>{child}</Slide>
        ))}
      </div>
    </div>
  )
}

export default Carousel
