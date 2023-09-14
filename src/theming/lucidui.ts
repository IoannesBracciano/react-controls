import { css } from 'styled-components'

export type Color = {
  colorspace: 'rgb' | 'hsv'
  components: number[]
  toString(format?: string): string
}

function Color(cssColor: string): Color {
  const color: Color = Object.create(Color.prototype)

  if (cssColor.startsWith('#')) {
    color.colorspace = 'rgb'
    color.components = cssColor
      .replace('#', '')
      .padEnd(8, 'f')
      .substring(0, 8)
      .split(/(..)/g)
      .filter(Boolean)
      .map((v) => parseInt(v, 16))
    color.components[3] /= 255
  } else if (cssColor.startsWith('rgb')) {
    color.colorspace = 'rgb'
    color.components = cssColor
      // Remove function name and opening parenthesis
      .replace(/^rgb(a?)\(/g, '')
      // Remove closing parenthesis
      .slice(0, -1)
      // Split color components separated by comma
      .split(/(,)|(\w,)/)
      // Convert to number
      .map((c) => +c)
  } else {
    throw Error('CSS color string format not yet supported')
  }
  return color
}

Color.prototype.toString = function Color__proto__toString(
  this: Color,
  format: string
) {
  if (format === 'hex') {
    return '#' + this.components.map((c) => c.toString(16)).join('')
  } else {
    return this.colorspace + 'a(' + this.components.join(',') + ')'
  }
}

// export interface LightParams {
//   angle: number
//   distance: number
// }

// export interface CompositionParams {
//   light: LightParams
//   theme: ThemeVariables
//   units: 'px' | 'pt' | 'em' | 'rem'
// }

// export interface ThemeVariables {
//   boxShadowBlur: string[]
//   boxShadowColor: string
//   boxShadowSpread: string[]
// }

// export interface ThemeElevationVariables {

// }

// export interface ThemeSurfaceVariables {

// }

// export function Composition(params: CompositionParams) {

// }

const Scene = {
  getParam: (paramName: string, unitless = false) =>
    unitless
      ? SceneParams[paramName]
      : `${SceneParams[paramName]}${SceneParams.unit}`,
  getShadowParams: (elevation: number, unitless = false) => {
    const absoluteShadowOffset =
      (SceneParams.shadowBaseOffset * elevation) / 100
    const offsetX =
      Math.cos(SceneParams.lightSourceAngle) * absoluteShadowOffset
    const offsetY =
      Math.sin(SceneParams.lightSourceAngle) * absoluteShadowOffset
    const blur = (SceneParams.lightScatter * elevation) / 100
    const spread = blur / 3
    return {
      offsetX: unitless ? offsetX : `${offsetX}${SceneParams.unit}`,
      offsetY: unitless ? offsetY : `${offsetY}${SceneParams.unit}`,
      blur: unitless ? blur : `${blur}${SceneParams.unit}`,
      spread: unitless ? spread : `${spread}${SceneParams.unit}`
    }
  }
}

const SceneParams = {
  borderBaseRadius: 3,
  lightScatter: 20,
  lightSourceAngle: Math.PI / 2,
  shadowBaseOffset: 8,
  unit: 'px'
}

export interface ElementProps {
  elevation?: number
}

export function Element({ elevation }: ElementProps) {
  const rules = []
  if (typeof elevation === 'number') {
    const { offsetX, offsetY, blur, spread } = Scene.getShadowParams(elevation)
    rules.push(`box-shadow: ${offsetX} ${offsetY} ${blur} ${spread} #00000022;`)
  }
  return css`
    ${rules.join('')}
  `
}

export interface MaterialAcrylicProps {
  color: string
  opacity?: number
}

export function MaterialAcrylic({
  color,
  opacity = 0.8
}: MaterialAcrylicProps) {
  const _color = Color(color)
  _color.components[3] = opacity
  return css`
    background-color: ${_color.toString()};
    backdrop-filter: blur(16px) brightness(0.8) saturate(2.5);
  `
}

export interface MaterialSolidProps {
  color: string
}

export function MaterialSolid({ color }: MaterialSolidProps) {
  return css`
    background-color: ${color};
  `
}

export type MaterialConstructor = typeof MaterialAcrylic | typeof MaterialSolid

export interface SurfaceProps {
  elevation?: number
  material: MaterialConstructor
  roundness?: number
  shape?: 'ellipsis' | 'pill' | 'rectangle'
}

export function Surface({ elevation = 0, material }: SurfaceProps) {
  // const { offsetX, offsetY, blur, spread } = Scene.getShadowParams(elevation)
  return css`
    ${Element({ elevation })}
    ${material}
    border-radius: ${Scene.getParam('borderBaseRadius')};
  `
}

export const Mixins = {
  actionable: css`
    &:active {
      filter: brightness(97%);
    }
    &:focus,
    &:hover {
      filter: brightness(107%);
    }
  `,
  pressable: css`
    &:active {
      ${Element({ elevation: 10 })}
    }
    &:focus,
    &:hover {
      ${Element({ elevation: 20 })}
    }
    &:hover {
      cursor: pointer;
    }
  `
}
