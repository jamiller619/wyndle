import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

const Portal = ({ to, children }) => {
  const [{ isRendered }, setState] = useState({
    isRendered: false
  })

  useEffect(() => {
    setState({
      isRendered: true
    })
  }, [isRendered])

  return (to && to.current && createPortal(children, to.current)) || null
}

export default Portal
