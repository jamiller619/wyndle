import React, { Children, Fragment } from 'react'
import { classNames } from '/shared/utils'

import globalStyles from '/shared/global.scss'
import styles from './table.scss'

const Table = ({ header, children, ...props }) => {
  return (
    <Fragment>
      <h3 className={styles.header}>{header}</h3>
      <ul
        {...classNames(
          globalStyles.listUnstyled,
          styles.table,
          props.className
        )}>
        {Children.map(children, child => (
          <li>{child}</li>
        ))}
      </ul>
    </Fragment>
  )
}

export default Table
