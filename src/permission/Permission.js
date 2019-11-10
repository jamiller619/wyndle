import ambitious from 'ambitious'
import anime from 'animejs'
import user from '/user'

import textStyles from '/typography/typography.scss'
// import buttonStyles from '/forms/button.scss'
import pageStyles from '/page/page.scss'
import styles from './permission.scss'

const selectChildren = element => {
  return (element.childElementCount > 0
    ? [...element.children].map(child => selectChildren(child))
    : [element]
  ).flat()
}

const animateOptions = target => {
  const targets = selectChildren(target)

  return isAnimatingIn => ({
    targets,
    easing: 'spring(3, 80, 90, 0.3)',
    delay: anime.stagger(250),
    translateY: isAnimatingIn ? [40, 0] : [0, 70],
    opacity: isAnimatingIn ? [0, 1] : [1, 0]
  })
}

const animate = target => {
  const opts = animateOptions(target)

  return anime(opts(true)) && (() => anime(opts(false)).finished)
}

const Dialog = ({ useEffect, onSetLocationTracking }) => {
  useEffect(animate)

  return (
    <div class={pageStyles.page}>
      <h3 class={textStyles.center}>
        How should Wyndle determine your location for showing you the weather?
      </h3>
      <div class={buttonStyles.groupVertical}>
        <button
          class={buttonStyles.primary}
          onClick={e => onSetLocationTracking(e, true)}>
          Automatically
        </button>
        <button
          class={buttonStyles.link}
          onClick={e => onSetLocationTracking(e, false)}>
          Manually
        </button>
      </div>
    </div>
  )
}

const Permission = (
  { useEffect, children },
  { allowsAutoLocation, setState }
) => {
  useEffect(() => {
    user.isPermissionGranted().then(allowsAutoLocation => {
      setState({
        allowsAutoLocation
      })
    })
  })

  return allowsAutoLocation != null ? (
    children[0](allowsAutoLocation)
  ) : (
    <Dialog
      class={styles.dialog}
      onSetLocationTracking={(e, allowsAutoLocation) => {
        setState({
          allowsAutoLocation
        })
      }}
    />
  )
}

Permission.defaultState = {
  allowsAutoLocation: null
}

export default Permission
