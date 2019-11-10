export const { random, round, PI, abs, cos, sin } = Math

export const rand = n => n * random()
export const TAU = 2 * PI
export const fadeInOut = (t, m) => {
  let hm = 0.5 * m
  return abs(((t + hm) % m) - hm) / hm
}
