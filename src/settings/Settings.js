import React, { useState, useRef, Fragment } from 'react'
import anime from 'animejs'
import SettingsContent from './SettingsContent'
import Portal from '/shared/Portal'
import { MenuIcon, CloseIcon } from '/icons'

import { useAnime } from '/anime'
import { classNames } from '/shared/utils'

import styles from './settings.scss'

const easing = 'spring(0.8, 80, 100, 15)'

const handleTriggerToggle = (setState, isOpen, appContainerRef) => e => {
  // anime({
  //   targets: appContainerRef.current,
  //   // targets: e.target.closest(`.${styles.trigger}`),
  //   scale: [1, 0.82, 1]
  // })

  setState({
    isOpen: !isOpen
  })
}

const Trigger = ({ isOpen, handleToggle }) => {
  return (
    <div className={styles.trigger} onClick={handleToggle}>
      {isOpen ? <CloseIcon /> : <MenuIcon />}
    </div>
  )
}

const Settings = ({ appContainerRef, triggerRef }) => {
  const settingsContainerRef = useRef()

  const [{ isOpen }, setState] = useState({
    isOpen: false
  })

  useAnime(settingsContainerRef, {
    easing,
    translateX: isOpen ? 0 : -70,
    translateZ: isOpen ? 0 : -30
  })

  useAnime(appContainerRef, {
    // easing,
    easing: 'spring(0.4, 80, 100, 4)',
    translateX: isOpen ? '80vw' : '0vw',
    scale: [0.92, 1],
    begin() {
      if (!isOpen) appContainerRef.current.style.overflow = 'unset'
    },
    complete() {
      if (!isOpen) appContainerRef.current.style.overflow = 'hidden'
    }
  })

  return (
    <Fragment>
      <Portal to={triggerRef}>
        <Trigger
          isOpen={isOpen}
          handleToggle={handleTriggerToggle(setState, isOpen, appContainerRef)}
        />
      </Portal>
      <div
        {...classNames(styles.container, isOpen && styles.open)}
        ref={settingsContainerRef}>
        <SettingsContent />
      </div>
    </Fragment>
  )
}

export default Settings
