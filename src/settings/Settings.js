import React, { useState, useRef, Fragment } from 'react'
import anime from 'animejs'
import { useDrag } from 'react-use-gesture'
import SettingsContent from './SettingsContent'
import Portal from '/shared/Portal'
import { classNames, clamp } from '/shared/utils'
import { MenuIcon, CloseIcon } from '/icons'

import styles from './settings.scss'

const Trigger = ({ isOpen, handleToggle, ...props }) => {
  return (
    <div className={styles.trigger} onClick={handleToggle} {...props}>
      {isOpen ? <CloseIcon /> : <MenuIcon />}
    </div>
  )
}

const Settings = ({ appContainerRef, triggerRef }) => {
  const settingsContainerRef = useRef()
  const [{ isOpen }, setState] = useState({
    isOpen: false
  })

  const max = window.innerWidth * 0.78
  const onDragOptions = {
    delay: true
  }

  const onDrag = ({ last, xy: [x], direction: [dirx] }) => {
    if (last) {
      const tx = dirx === 0 ? (isOpen ? 0 : max) : dirx > 0 ? max : 0

      anime({
        targets: appContainerRef.current,
        easing: 'spring(0.8, 80, 100, 15)',
        translateX: `${tx}px`,
        scale: 1,
        begin() {
          setState({
            isOpen: tx > 0
          })
        }
      })
    } else {
      const tx = clamp(x - 40, 0, max)
      const transform = `translateX(${tx}px) scale(0.98)`

      appContainerRef.current.style.transform = transform
    }
  }

  const gestures = useDrag(onDrag, onDragOptions)

  return (
    <Fragment>
      <Portal to={triggerRef}>
        <Trigger
          isOpen={isOpen}
          {...gestures()}
          onClick={e => {
            e.stopPropagation()
            setState({
              isOpen: !isOpen
            })
          }}
        />
      </Portal>
      <div className={styles.container} ref={settingsContainerRef}>
        <SettingsContent />
      </div>
    </Fragment>
  )
}

export default Settings
