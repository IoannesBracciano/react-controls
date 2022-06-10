
export function brightness(hex: string) {
  const hspBrightnessCoef = [0.299, 0.587, 0.114]
  const rgbSquared = parse(hex).map((comp) => Math.pow(comp, 2))
  return hspBrightnessCoef
    .map((coef, i) => coef * rgbSquared[i])
    .reduce((brightness, comp) => brightness + comp, 0)
}

export function parse(hex: string) {
  const [r, g, b, a] = hex
    .replace('#', '')
    .padEnd(8, 'f')
    .substring(0, 8)
    .split(/(..)/g)
    .filter(Boolean)
    .map((v) => parseInt(v, 16))
  return [r, g, b, a / 255.0]
}

export function tone(hex: string): 'dark' | 'light' {
  return brightness(hex) < 127.5 ? 'dark' : 'light'
}
