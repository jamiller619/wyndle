// import ambitious, { useEffect, useState } from 'ambitious'
// import { useRef } from 'ambitious-utils/Hooks'
import React, { useRef, useEffect, useState } from 'react'
import SimplexNoise from 'simplex-noise'
import { rand, fadeInOut, TAU, cos, sin, round } from './utils'

import styles from './backdrop.scss'

/**
 * Source inspired by (or almost straight copied from...)
 * https://github.com/crnacura/AmbientCanvasBackgrounds
 */

const opts = {
  circleCount: 50,
  lightness: 50,
  saturation: 50,
  baseSpeed: 0.1,
  rangeSpeed: 1,
  baseTTL: 150,
  rangeTTL: 200,
  baseRadius: 50,
  rangeRadius: 200,
  baseHue: 220,
  rangeHue: 60,
  xOff: 0.0015,
  yOff: 0.0015,
  zOff: 0.0015,
  backgroundColor: 'hsla(0,0%,5%,1)'
}

const circlePropCount = 8
let circlePropsLength

let canvas
let ctx
let circleProps
let simplex

function initCircles() {
  circleProps = new Float32Array(circlePropsLength)
  simplex = new SimplexNoise()

  let i

  for (i = 0; i < circlePropsLength; i += circlePropCount) {
    initCircle(i)
  }
}

function initCircle(i) {
  let x, y, n, t, speed, vx, vy, life, ttl, radius, hue

  x = rand(canvas.a.width)
  y = rand(canvas.a.height)
  n = simplex.noise3D(x * opts.xOff, y * opts.yOff, opts.baseHue * opts.zOff)
  t = rand(TAU)
  speed = opts.baseSpeed + rand(opts.rangeSpeed)
  vx = speed * cos(t)
  vy = speed * sin(t)
  life = 0
  ttl = opts.baseTTL + rand(opts.rangeTTL)
  radius = opts.baseRadius + rand(opts.rangeRadius)
  hue = opts.baseHue + n * opts.rangeHue

  circleProps.set([x, y, vx, vy, life, ttl, radius, hue], i)
}

function updateCircles() {
  let i

  for (i = 0; i < circlePropsLength; i += circlePropCount) {
    updateCircle(i)
  }
}

function updateCircle(i) {
  let i2 = 1 + i,
    i3 = 2 + i,
    i4 = 3 + i,
    i5 = 4 + i,
    i6 = 5 + i,
    i7 = 6 + i,
    i8 = 7 + i
  let x, y, vx, vy, life, ttl, radius, hue

  x = circleProps[i]
  y = circleProps[i2]
  vx = circleProps[i3]
  vy = circleProps[i4]
  life = circleProps[i5]
  ttl = circleProps[i6]
  radius = circleProps[i7]
  hue = circleProps[i8]

  drawCircle(x, y, life, ttl, radius, hue)

  life++

  circleProps[i] = x + vx
  circleProps[i2] = y + vy
  circleProps[i5] = life
  ;(checkBounds(x, y, radius) || life > ttl) && initCircle(i)
}

function drawCircle(x, y, life, ttl, radius, hue) {
  ctx.a.save()

  const fill = `hsla(${round(hue)},${opts.saturation}%,${
    opts.lightness
  }%,${fadeInOut(life, ttl)})`

  ctx.a.fillStyle = fill
  ctx.a.beginPath()
  ctx.a.arc(x, y, radius, 0, TAU)
  ctx.a.fill()
  ctx.a.closePath()
  ctx.a.restore()
}

function checkBounds(x, y, radius) {
  return (
    x < -radius ||
    x > canvas.a.width + radius ||
    y < -radius ||
    y > canvas.a.height + radius
  )
}

function resize() {
  let { innerWidth, innerHeight } = window

  canvas.a.width = innerWidth
  canvas.a.height = innerHeight

  ctx.a.drawImage(canvas.b, 0, 0)

  canvas.b.width = innerWidth
  canvas.b.height = innerHeight

  ctx.b.drawImage(canvas.a, 0, 0)
}

function render() {
  ctx.b.save()
  ctx.b.filter = 'blur(50px)'
  ctx.b.drawImage(canvas.a, 0, 0)
  ctx.b.restore()
}

function draw() {
  ctx.a.clearRect(0, 0, canvas.a.width, canvas.a.height)
  ctx.b.fillStyle = opts.backgroundColor
  ctx.b.fillRect(0, 0, canvas.b.width, canvas.b.height)
  updateCircles()
  render()
  window.requestAnimationFrame(draw)
}

const Backdrop = props => {
  const canvasRef = useRef()
  const [{ isLoaded }, setState] = useState({
    isLoaded: false
  })

  Object.assign(opts, props)
  circlePropsLength = opts.circleCount * circlePropCount

  useEffect(() => {
    if (!isLoaded) {
      canvas = {
        a: document.createElement('canvas'),
        b: canvasRef.current
      }

      ctx = {
        a: canvas.a.getContext('2d'),
        b: canvas.b.getContext('2d')
      }

      resize()
      initCircles()
      draw()

      window.addEventListener('resize', resize)

      setState({
        isLoaded: true
      })
    }
  }, [isLoaded])

  return (
    <div className={styles.container}>
      <canvas className={styles.canvas} ref={canvasRef} />
    </div>
  )
}

export default Backdrop
