import React, { useEffect, useState, useRef, Fragment } from 'react'
// import anime from 'animejs'
import Carousel from '/carousel'
// import { Hourly, Daily, Radar } from '/forecast-tiles'
import Hourly from '/forecast-tiles/Hourly'
import { getForecastByLocation } from './Forecast'
// import { LocationIcon } from '/icons'
import { classNames } from '/shared/utils'

import globalStyles from '/shared/global.scss'
import styles from './weather.scss'

const Weather = ({ location }) => {
  const { city, region } = location || {}
  const date = new Date().toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  })

  const [{ current, daily, hourly }, setState] = useState({
    current: {},
    daily: [],
    hourly: []
  })

  useEffect(() => {
    if (location) {
      getForecastByLocation(location).then(weather => {
        setState({
          ...weather
        })
      })
    }
  }, [location != null])

  // const heroRef = useRef()
  // const [
  //   { date, current, daily, hourly, isWeatherLoaded, isTileOpen },
  //   setState
  // ] = useState({
  //   date: null,
  //   current: {},
  //   daily: [{}],
  //   hourly: [],
  //   isWeatherLoaded: false,
  //   isTileOpen: false
  // })

  // useEffect(() => {
  //   anime({
  //     targets: heroRef.current,
  //     scale: isTileOpen ? 0.9 : 1,
  //     delay: 250,
  //     easing: 'easeOutQuint'
  //   })

  //   if (!isWeatherLoaded) {
  //     getForecastByLocation(location).then(weather => {
  //       setState({
  //         ...weather,
  //         isWeatherLoaded: true,
  //         date: new Date().toLocaleString('en-US', {
  //           weekday: 'short',
  //           month: 'short',
  //           day: 'numeric'
  //         })
  //       })
  //     })
  //   }
  // }, [isWeatherLoaded, isTileOpen])
  const carouselBackdropPortalRef = useRef()

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h4 {...classNames(styles.inset, styles.location)}>
          <span className={globalStyles.text}>{date}</span>
          <span>
            {city}, {region}
          </span>
        </h4>
        <h1 className={styles.currentTemp}>{current.temp}</h1>
        <h3 {...classNames(styles.inset, styles.weatherCondition)}>
          <span>{current.summary}</span>
          <span>{daily.length > 0 && `${daily[0].high}/${daily[0].low}`}</span>
        </h3>
      </div>
      <div ref={carouselBackdropPortalRef} />
      <Carousel className={styles.carousel}>
        <div>Something</div>
        <Hourly
          forecast={hourly}
          className={styles.today}
          backdropPortalRef={carouselBackdropPortalRef}
        />
        <div>Something 2</div>
      </Carousel>
    </div>
  )

  // return (
  //   <div className={styles.container} {...props}>
  //     <div className={styles.hero} ref={heroRef}>
  //       <h4 className={[styles.inset, styles.location]}>
  //         <span className={globalStyles.text}>{date}</span>
  //         <span>{`${city}, ${region}`}</span>
  //       </h4>
  //       <h1 className={styles.currentTemp}>{current.temp}</h1>
  //       <h3 className={[styles.inset, styles.weatherCondition]}>
  //         <span>{current.summary}</span>
  //         <span>
  //           {daily[0].high &&
  //             daily[0].low &&
  //             `${daily[0].high}/${daily[0].low}`}
  //         </span>
  //       </h3>
  //     </div>
  //     <Carousel className={styles.carousel}>
  //       {/* <Radar /> */}
  //       <Hourly
  //         forecast={hourly}
  //         className={styles.today}
  //         // attachBackdropTo={() =>
  //         //   document.querySelector(classFor(styles.container))
  //         // }
  //         toggleOpen={isOpen => {
  //           setState({
  //             isTileOpen: isOpen
  //           })
  //         }}
  //       />
  //       {/* <Daily /> */}
  //     </Carousel>
  //   </div>
  // )
}

export default Weather
