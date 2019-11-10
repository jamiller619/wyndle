import { useEffect } from 'react'
import anime from 'animejs'

const useAnime = (targetsRef, animeProps, deps) => {
  useEffect(() => {
    anime({
      targets: targetsRef.current,
      ...animeProps
    })
  }, deps)
}

export default useAnime
