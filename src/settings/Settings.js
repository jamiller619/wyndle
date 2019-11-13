import React, { useState, useRef, Fragment } from 'react'
import anime from 'animejs'
import { useDrag } from 'react-use-gesture'
import SettingsContent from './SettingsContent'
import Portal from '/shared/Portal'
import { clamp, lerp } from '/shared/utils'
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
  const handleTriggerClick = e => {
    e.stopPropagation()
    setState({
      isOpen: !isOpen
    })
  }

  const easing = 'spring(0.8, 100, 80, 15)'
  const max = window.innerWidth * 0.78
  const onDragOptions = {
    delay: true
  }

  const onDrag = ({ last, xy: [x], direction: [dirx] }) => {
    if (last) {
      const tx = dirx === 0 ? (isOpen ? 0 : max) : dirx > 0 ? max : 0

      anime({
        targets: appContainerRef.current,
        easing,
        translateX: `${tx}px`,
        scale: 1,
        begin() {
          setState({
            isOpen: tx > 0
          })
        }
      })

      anime({
        targets: settingsContainerRef.current,
        easing,
        translateX: isOpen ? -30 : 0,
        translateZ: isOpen ? -20 : 0
      })
    } else {
      const tx = clamp(x - 40, 0, max)
      const percentComplete = x / max
      const panelTransform = {
        x: clamp(lerp(-30, 0, percentComplete), -30, 0),
        z: clamp(lerp(-20, 0, percentComplete), -20, 0)
      }

      const appTransform = `translateX(${tx}px) scale(0.98)`
      const settingsTransform = `translateX(${panelTransform.x}px) translateZ(${panelTransform.z}px)`

      appContainerRef.current.style.transform = appTransform
      settingsContainerRef.current.style.transform = settingsTransform
    }
  }

  const gestures = useDrag(onDrag, onDragOptions)

  return (
    <Fragment>
      <Portal to={triggerRef}>
        <Trigger isOpen={isOpen} {...gestures()} onClick={handleTriggerClick} />
      </Portal>
      <div className={styles.container} ref={settingsContainerRef}>
        <SettingsContent />
      </div>
    </Fragment>
  )
}

export default Settings
