import {
  css,
  FlattenInterpolation,
  FlattenSimpleInterpolation,
  StyledComponent,
  ThemeProps
} from 'styled-components'
import { rgb } from './rgb'

export type AccentName =
  | 'error'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'

export type Scale = 'sm' | 'md' | 'lg'

export type ColorPalette = {
  base: string
}

export interface Theme {
  accent: {
    base: {
      error: string
      primary: string
      secondary: string
      success: string
      warning: string
    }
    palette: {
      error: string
      primary: string
      secondary: string
      success: string
      warning: string
    }
  }
  border: {
    radius: string
  }
  drop: {
    bottom: string[]
    color: {
      error: string
      primary: string
      secondary: string
      success: string
      warning: string
    }
    left: string[]
    right: string[]
    top: string[]
  }
  layout: {
    container: {
      margin: {
        block: string
        inline: string
      }
    }
    content: {
      padding: string
    }
  }
  palette: {
    black: string
    blue: {
      light: string
    }
    gray: {
      light: string
    }
    white: string
  }
  shadow: []
  spacing: {
    horizontal: string[]
    vertical: string[]
  }
  typography: {
    font: {
      face: string
      size: string
    }
    ink: {
      black: string
      white: string
    }
  }
}

export const ThemeResolver = {
  getAccentBaseColor:
    (accentName: string) =>
    ({ theme }: ThemeProps<Theme>) => {
      return theme.accent.base[accentName]
    },
  getAccentPalette:
    (accentName: string) =>
    ({ theme }: ThemeProps<Theme>) =>
      theme.accent.palette[accentName],
  getBaseFontSize:
    (size: Scale) =>
    ({ theme }: ThemeProps<Theme>) => {
      return theme.typography.font.size[size]
    },
  getBorderRadius:
    (radiusIndex: number) =>
    ({ theme }: ThemeProps<Theme>) =>
      theme.border.radius[radiusIndex],
  getColor:
    (colorName: string, tone: string = 'default') =>
    ({ theme }: ThemeProps<Theme>) =>
      colorName === 'white' || colorName === 'black'
        ? theme.palette[colorName]
        : theme.palette[colorName][tone],
  getInkForAccentedSurface:
    (accentName: string) =>
    ({ theme }: ThemeProps<Theme>) => {
      const color = theme.accent.base[accentName]
      return rgb.parseHex(color).toHsl().l() <= 0.55
        ? theme.typography.ink.white
        : theme.typography.ink.black
    },
  getInkForColor:
    (color: string) =>
    ({ theme }: ThemeProps<Theme>) =>
      rgb.parseHex(color).toHsl().l() <= 0.65
        ? theme.typography.ink.white
        : theme.typography.ink.black,
  getShadow:
    (depthIndex: number, color = '#000000') =>
    ({ theme }: ThemeProps<Theme>) =>
      `${theme.drop.bottom[depthIndex]} ${color}`,
  getSpacing:
    (spacingIndex: number) =>
    ({ theme }: ThemeProps<Theme>) =>
      `${theme.spacing.vertical[spacingIndex]} ${theme.spacing.horizontal[spacingIndex]}`
}

export const focusoutline = (
  selector?:
    | ':after'
    | ':before'
    | FlattenSimpleInterpolation
    | StyledComponent<any, any>
) => css`
  &:focus,
  &:focus-visible {
    outline-color: transparent;
  }
  &${selector || ''}, & ${selector || ''} {
    border: 1px solid transparent;
    outline: 3px solid transparent;
  }
  &:focus${selector || ''},
    &:focus
    ${selector || ''},
    &:focus-visible${selector || ''},
    &:focus-visible
    ${selector || ''} {
    border-color: ${ThemeResolver.getColor('coralblue', '300')}b8;
    outline-color: ${ThemeResolver.getColor('coralblue', '300')}b8;
  }
`

export const raise =
  (level: number, accent: string = 'neutral') =>
  ({ theme }: ThemeProps<Theme>) =>
    css`
      & {
        box-shadow: ${theme.drop.bottom[level]} ${theme.drop.color[accent]}30;
      }
    `

export const brightness = (
  amount: string,
  on: string[] = [':focus', ':hover'],
  condition: boolean = true
) =>
  condition &&
  css`
    ${on.map(
      (modif) =>
        css`
          &${modif} {
            filter: brightness(${amount});
          }
        `
    )}
  `

export type RectProps = {
  height?: string | { max?: string; min?: string }
  radiusIndex?: number
  width?: string | { max?: string; min?: string }
}

export const rect = ({
  height = '1em',
  radiusIndex = 0,
  width = '1em'
}: RectProps) => css`
  ${typeof height === 'string'
    ? `height: ${height};`
    : `min-height: ${height.min || 'unset'}; max-height: ${
        height.max || 'unset'
      };`}
  ${typeof width === 'string'
    ? `width: ${width};`
    : `min-width: ${width.min || 'unset'}; max-width: ${width.max || 'unset'};`}
  border-radius: ${ThemeResolver.getBorderRadius(radiusIndex)};
`

export type ContainerProps = RectProps & {
  rounded?: number
  scale?: 'sm' | 'md' | 'lg'
  spacing?: number
}

export const container = ({
  height = 'auto',
  rounded = 3,
  spacing = 5,
  scale = 'md',
  width = 'auto'
}: ContainerProps = {}) => css`
  ${rect({ height, width, radiusIndex: rounded })}
  font-size: ${ThemeResolver.getBaseFontSize(scale)};
  padding: ${ThemeResolver.getSpacing(spacing)};
  position: relative;
`

export type SurfaceProps = RectProps & {
  accent?: string
  material?: FlattenInterpolation<ThemeProps<Theme>>
  raised?: Record<string, number>
  rounded?: boolean
  scale?: Scale
}

export const solid = (color: string) => css`
  background-color: ${color.startsWith('#')
    ? color
    : ThemeResolver.getAccentBaseColor(color)};
  color: ${ThemeResolver.getInkForColor(color)};
`

export const surface = ({
  accent,
  material,
  rounded = true
}: SurfaceProps = {}) => css`
  ${material && material}
  ${accent &&
  css`
    background-color: ${ThemeResolver.getAccentBaseColor(accent)};
    color: ${ThemeResolver.getInkForAccentedSurface(accent)};
  `};
`
