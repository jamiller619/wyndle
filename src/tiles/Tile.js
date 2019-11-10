import React, { useState, useEffect, useRef, Fragment } from 'react'
import Portal from '/shared/Portal'
import anime from 'animejs'
import { CloseIcon } from '/icons'
import { classNames } from '/shared/utils'

import styles from './tile.scss'

// anime.speed = 0.2

const openAnimationParams = {
  x: 0,
  y: 5,
  width: 100,
  height: 95,
  scale: [
    { value: 1, duration: 160 },
    { value: 0.8 },
    { value: 1, duration: 260 }
  ],
  opacity: 0.8
}

const closeAnimationParams = {
  x: 7,
  y: 56,
  width: 86,
  height: 42,
  opacity: 0.3
}

const animateCloseIcon = (closeIcon, isOpen) => {
  anime({
    targets: closeIcon,
    opacity: isOpen ? 1 : 0,
    duration: 100,
    easing: 'linear'
  })
}

const animateTile = (isOpen, backdrop, body) => {
  const title = body.firstChild
  const content = body.children[1]
  const closeIcon = body.querySelector(`.${styles.closeIcon}`)
  const common = {
    easing: isOpen ? 'easeInExpo' : 'easeInOutCirc'
  }

  if (!isOpen) {
    animateCloseIcon(closeIcon, false)
    backdrop.style.backdropFilter = ''
  }

  anime({
    targets: title,
    translateX: isOpen ? -14 : 0,
    translateY: isOpen ? -410 : 0,
    delay: isOpen ? 50 : 0,
    duration: isOpen ? 500 : 550,
    ...common
  })

  anime({
    targets: backdrop.firstChild,
    delay: isOpen ? 0 : 60,
    duration: isOpen ? 550 : 490,
    ...common,
    ...(isOpen ? openAnimationParams : closeAnimationParams),
    complete() {
      if (isOpen) {
        animateCloseIcon(closeIcon, true)
        backdrop.style.backdropFilter = 'blur(5px)'
      }
    }
  })
}

const TileColumn = ({ top, center, bottom }) => {
  return (
    <div className={styles.column}>
      {top}
      {center}
      {bottom}
    </div>
  )
}

const Tile = ({ toggleOpen, title, backdropPortalRef, children, ...props }) => {
  const tileRef = useRef()
  const [{ isOpen }, setState] = useState({
    isOpen: false
  })

  useEffect(() => {
    console.log(backdropPortalRef.current.querySelector('rect'))
    anime({
      targets: backdropPortalRef.current.querySelector('rect'),
      easing: 'spring(0.8, 80, 100, 18)',
      x: isOpen ? 0 : 7,
      y: isOpen ? 1.5 : 62,
      width: isOpen ? '100px' : '86px',
      height: isOpen ? '100px' : '35px'
    })
    // animateTile(isOpen === true, backdropPortalRef.current, tileRef.current)
    // if (backdropPortal) {
    //   animateTile(isOpen, backdropPortal, tileRef.current)
    // } else {
    //   const portalContainer = attachBackdropTo && attachBackdropTo()
    //   if (portalContainer) {
    //     setState({
    //       backdropPortal: portalContainer
    //     })
    //   }
    // }
  }, [isOpen])

  return (
    <Fragment>
      {backdropPortalRef && (
        <Portal to={backdropPortalRef}>
          <svg
            viewBox="0 0 100 100"
            className={styles.backdrop}
            preserveAspectRatio="none">
            <rect />
          </svg>
        </Portal>
      )}
      <div
        ref={tileRef}
        {...classNames(styles.tile, props.className)}
        onClick={() => {
          setState({
            isOpen: !isOpen
          })

          console.log(toggleOpen)

          // toggleOpen(isOpen === false)
        }}>
        <div className={styles.title}>
          <h3>{title}</h3>
          <CloseIcon className={styles.closeIcon} />
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </Fragment>
  )
}

export { Tile as default, TileColumn }
