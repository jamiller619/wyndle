import React, { useState, useEffect, useRef, Fragment } from 'react'
import Backdrop from '/backdrop'
import Settings from '/settings/Settings'
import user from '/user'
import Weather from '/weather'

import styles from './app.scss'

const App = () => {
  const [{ location }, setState] = useState({
    location: null
  })

  useEffect(() => {
    user.getActiveLocation().then(activeLocation => {
      setState({
        location: activeLocation
      })
    })
  }, [location != null])

  // const conditionSummary = weather && weather.current && weather.current.icon

  const settingsProps = {
    triggerRef: useRef(),
    appContainerRef: useRef()
  }

  return (
    <Fragment>
      <Settings {...settingsProps} />
      <div className={styles.app} ref={settingsProps.appContainerRef}>
        <Backdrop />
        <Weather ref={settingsProps.appRef} location={location} />
        <div ref={settingsProps.triggerRef} />
      </div>
    </Fragment>
  )
}

export default App
