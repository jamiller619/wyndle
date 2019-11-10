import React from 'react'
// import { UserContext } from '/user'

import pageStyles from '/page/page.scss'
// import buttonStyles from '/forms/button.scss'

const AutoLocate = (props, { allowsAutoLocate, setState }) => {
  // const { locateCurrentPosition } = UserContext.useContext()

  return allowsAutoLocate ? (
    ''
  ) : (
    <div class={pageStyles.page}>
      <div>
        <h3>Hey there!</h3>
        <p>
          To begin, we need at least one location to show the weather for. You
          can either share your location with us for automatic weather based on
          your location, or you can enter in a location manually.
        </p>
      </div>
      <div class={buttonStyles.buttonGroupVertical}>
        <button
          class={buttonStyles.primary}
          onClick={async () => {
            const location = await locateCurrentPosition()

            setState({
              allowsAutoLocate: true
            })
          }}>
          Get my location automatically
        </button>
        <button class={buttonStyles.tertiary}>Get my location manually</button>
      </div>
    </div>
  )
}

Location.defaultState = {
  allowsAutoLocate: null
}

export default AutoLocate
