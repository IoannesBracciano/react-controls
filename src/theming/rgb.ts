import { hsl } from './hsl'

export function rgb(r: number, g: number, b: number) {
  const instance = Object.create(rgb.prototype)
  return Object.assign(instance, {
    r() {
      return r
    },
    g() {
      return g
    },
    b() {
      return b
    }
  })
}

rgb.parseHex = function rgbParseHex(hex: string) {
  const [r, g, b] = hex
    .replace('#', '')
    .padEnd(6, 'f')
    .substring(0, 6)
    .split(/(..)/g)
    .filter(Boolean)
    .map((v) => parseInt(v, 16))
  return rgb(r, g, b)
}

rgb.prototype.toHsl = function rgbPrototypeToHsl() {
  const { r, g, b } = this
  const [r_, g_, b_] = [r(), g(), b()].map((v) => v / 255.0)
  const [cmax, cmin] = [Math.max(r_, g_, b_), Math.min(r_, g_, b_)]
  const delta = cmax - cmin
  const l = (cmax + cmin) / 2
  const h =
    delta === 0
      ? 0
      : cmax === r_
      ? 60 * (((g_ - b_) / delta) % 6)
      : cmax === g_
      ? 60 * ((b_ - r_) / delta + 2)
      : 60 * ((r_ - g_) / delta + 4)
  const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1))
  return hsl(h, s, l)
}

rgb.prototype.toString = function hslPrototypeToString() {
  return `rgb(${this.r()}, ${this.g()}, ${this.b()})`
}
