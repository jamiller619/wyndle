import React from 'react'
import { classNames } from '/shared/utils'
import styles from './icons.scss'

export const MenuIcon = props => {
  return (
    <svg
      {...props}
      {...classNames(styles.icon, props.className)}
      viewBox="0 0 24 24">
      <path d="M21.36,11.2v1.6H3.17V11.2ZM16.87,4.56V6.15H3.17V4.56Zm-4.6,13.29v1.59H3.17V17.85Z" />
    </svg>
  )
}

export const LocationIcon = props => {
  return (
    <svg
      {...props}
      {...classNames(styles.iconSmall, props.className)}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg">
      <path d="M19.78,4.22l-.69,1.62L13.25,20.16l-.63,1.62-.73-1.59L9.38,14.62,3.81,12.11l-1.59-.73,1.62-.63L18.16,4.91ZM17.1,6.9,6,11.44l4.24,1.93.26.13.14.26L12.56,18Z" />
    </svg>
  )
}

export const CloseIcon = props => (
  <svg
    {...props}
    {...classNames(styles.icon, props.className)}
    viewBox="0 0 24 24">
    <path d="M5.44,4.31,12,10.92l6.56-6.61,1.13,1.13L13.08,12l6.61,6.56-1.13,1.13L12,13.08,5.44,19.69,4.31,18.56,10.92,12,4.31,5.44Z" />
  </svg>
)
