const { abs, max, min, sqrt } = Math

// function Color.parse(hex: string) {
//   const [r, g, b, a] = hex
//     .replace('#', '')
//     .padEnd(8, 'f')
//     .substring(0, 8)
//     .split(/(..)/g)
//     .filter(Boolean)
//     .map((v) => parseInt(v, 16))
//   return Color(r, g, b, a)
// }

// type ColorPrototype = {
//   brighten(amount: number): Color
//   darken(amount: number): Color
//   fade(amount: number): Color
//   toArray(): RGBAComponentsArray
//   toString(format: 'rgba' | 'hex'): string
// }

// type ColorConstructor = (
//   r: number,
//   g: number,
//   b: number,
//   a: number
// ) => Color & {
//   prototype: ColorPrototype
// }

export type RGBA = {
  r: number
  g: number
  b: number
  a: number
}

export type Color = RGBA & {
  brighten(amount: number): Color
  darken(amount: number): Color
  fade(amount: number): Color
  toArray(): number[]
  toString(format: 'rgba' | 'hex'): string
}

export function Color(
  _r: number,
  _g: number,
  _b: number,
  _a: number = 1
): Color {
  const [r, g, b] = [_r, _g, _b].map((v) => min(255, max(0, v)))
  const a = min(1, max(0, _a))
  const _this: Color = Object.assign<Color, RGBA>(
    Object.create(Color.prototype),
    { r, g, b, a }
  )
  return _this
  // return {
  //   a() {
  //     return a
  //   },
  //   b() {
  //     return b
  //   },
  //   brighten(amount: number) {
  //     return Color(r + r * amount, g + g * amount, b + b * amount, a)
  //   },
  //   darken(amount: number) {
  //     return Color(r - r * amount, g - g * amount, b - b * amount, a)
  //   },
  //   fade(amount: number) {
  //     return Color(r, g, b, a - a * amount)
  //   },
  //   g() {
  //     return g
  //   },
  //   h() {
  //     return h
  //   },
  //   l() {
  //     return l
  //   },
  //   r() {
  //     return r
  //   },
  //   s() {
  //     return s
  //   },
  //   toArray() {
  //     return [r, g, b, a] as const
  //   },
  //   toString() {
  //     return `rgba(${r}, ${g}, ${b}, ${a})`
  //   }
  // }
}

Color.parse = function _ColorParseFromHex(hex: string) {
  const [r, g, b, a] = hex
    .replace('#', '')
    .padEnd(8, 'f')
    .substring(0, 8)
    .split(/(..)/g)
    .filter(Boolean)
    .map((v) => parseInt(v, 16))
  return Color(r, g, b, a / 255.0)
}

Color.fromHSLA = function _ColorFromHSLA(
  h: number,
  s: number,
  l: number,
  a = 1.0
) {
  const c = (1 - abs(2 * l - 1)) * s
  const x = c * (1 - abs(((h / 60) % 2) - 1))
  const m = l - c / 2
  const [r_, g_, b_] =
    h >= 0 && h < 60
      ? [c, x, 0]
      : h >= 60 && h < 120
      ? [x, c, 0]
      : h >= 120 && h < 180
      ? [0, c, x]
      : h >= 180 && h < 240
      ? [0, x, c]
      : h >= 240 && h < 300
      ? [x, 0, c]
      : [c, 0, x]
  const [r, g, b] = [r_, g_, b_].map((v) => (v + m) * 255)
  return Color(~~r, ~~g, ~~b, a)
}

Color.toHSLA = function _ColorToHSLA(color: Color) {
  const { r, g, b, a } = color
  const [r_, g_, b_] = [r, g, b].map((v) => v / 255.0)
  const [cmax, cmin] = [max(r_, g_, b_), min(r_, g_, b_)]
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
  const s = delta === 0 ? 0 : delta / (1 - abs(2 * l - 1))
  return [h, s, l, a]
}

Color.prototype.brighten = function _ColorBrighten(
  this: Color,
  amount: number
) {
  const [h, s, l, a] = Color.toHSLA(this)
  const _amount = min(1.0, max(0.0, amount))
  const _l = max(0, l + l * _amount)
  return Color.fromHSLA(h, s, _l, a)
}

Color.prototype.darken = function _ColorDarken(amount: number) {
  const [h, s, l, a] = Color.toHSLA(this)
  const _amount = min(1.0, max(0.0, amount))
  const _l = max(0, l - l * _amount)
  return Color.fromHSLA(h, s, _l, a)
}

Color.prototype.fade = function _ColorFade(this: Color, amount: number) {
  const { r, g, b, a } = this
  const _amount = min(1.0, max(0.0, amount))
  const _a = max(0, a - a * _amount)
  return Color(r, g, b, _a)
}

Color.prototype.hsp = function _ColorPrototypeHsp(this: Color) {
  const { r, g, b } = this
  return sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b))
}

Color.prototype.toArray = function _ColorProtoToArray() {
  const { r, g, b, a } = this
  return [r, g, b, a] as const
}

Color.prototype.toString = function _ColorProtoToString(
  format: 'hex' | 'rgba' = 'hex'
) {
  const { r, g, b, a } = this
  return format === 'hex'
    ? '#' +
        [r, g, b, ~~(a * 255)]
          .map((v) => Number(v).toString(16).padStart(2, '0'))
          .join('')
    : `rgba(${r}, ${g}, ${b}, ${a})`
}

export default {
  attention: {
    // base: Color.parse('#f4e322'),
    base: Color.parse('#ffda2e'),
    text: Color.parse('#56430c')
  },
  danger: {
    base: Color.parse('#d02547'),
    text: Color.parse('#fff5f5')
  },
  primary: {
    base: Color.parse('#7f1eed'),
    text: Color.parse('#f8f5ff')
  },
  secondary: {
    base: Color.parse('#dcddfc'),
    text: Color.parse('#26273b')
  },
  success: {
    base: Color.parse('#31f290'),
    text: Color.parse('#2a4426')
  }
}
