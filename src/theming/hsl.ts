import { rgb } from './rgb'

export function hsl(h: number, s: number, l: number) {
  const _h = Math.abs(h) % 359
  const _s = Math.min(Math.abs(s), 1.0)
  const _l = Math.min(Math.abs(l), 1.0)
  const instance = Object.create(hsl.prototype)
  return Object.assign(instance, {
    h() {
      return _h
    },
    s() {
      return _s
    },
    l() {
      return _l
    }
  })
}

hsl.prototype.brighten = function hslPrototypeBrighten(amount: number) {
  const newL = Math.min(1.0, this.l() + this.l() * amount)
  return hsl(this.h(), this.s(), newL)
}

hsl.prototype.darken = function hslPrototypeDarken(amount: number) {
  const newL = Math.max(0.0, this.l() - this.l() * amount)
  return hsl(this.h(), this.s(), newL)
}

hsl.prototype.toRgb = function hslPrototypeToRgb() {
  const { h, s, l } = this
  const c = (1 - Math.abs(2 * l() - 1)) * s()
  const x = c * (1 - Math.abs(((h() / 60) % 2) - 1))
  const m = l() - c / 2
  const [r_, g_, b_] =
    h() >= 0 && h() < 60
      ? [c, x, 0]
      : h() >= 60 && h() < 120
      ? [x, c, 0]
      : h() >= 120 && h() < 180
      ? [0, c, x]
      : h() >= 180 && h() < 240
      ? [0, x, c]
      : h() >= 240 && h() < 300
      ? [x, 0, c]
      : [c, 0, x]
  const [r, g, b] = [r_, g_, b_].map((v) => (v + m) * 255)
  return rgb(~~r, ~~g, ~~b)
}

hsl.prototype.toString = function hslPrototypeToString() {
  return `hsl(${this.h()}, ${this.s()}, ${this.l()})`
}
