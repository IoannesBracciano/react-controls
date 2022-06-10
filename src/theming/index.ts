import { css, ThemeProps } from 'styled-components'
import { rgb } from './rgb'

export type AccentName =
  | 'error'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'

export type Scale = 'sm' | 'md' | 'lg'

export interface Theme {
  accent: {
    error: string
    primary: string
    secondary: string
    success: string
    warning: string
  }
  border: {
    radius: string
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
  getAccentColor:
    (accentName: string) =>
    ({ theme }: ThemeProps<Theme>) =>
      theme.accent[accentName],
  getBaseFontSize:
    (size: Scale) =>
    ({ theme }: ThemeProps<Theme>) => {
      return theme.typography.font.size[size]
    },
  getBorderRadius:
    (rounded: boolean) =>
    ({ theme }: ThemeProps<Theme>) =>
      theme.border.radius[+rounded],
  getColor:
    (colorName: string, tone: string = 'default') =>
    ({ theme }: ThemeProps<Theme>) =>
      colorName === 'white' || colorName === 'black'
        ? theme.palette[colorName]
        : theme.palette[colorName][tone],
  getContentPadding:
    () =>
    ({ theme }: ThemeProps<Theme>) =>
      theme.layout.content.padding,
  getInkForAccentedSurface:
    (accentName: string) =>
    ({ theme }: ThemeProps<Theme>) =>
      rgb.parseHex(theme.accent[accentName]).toHsl().l() <= 0.65
        ? theme.typography.ink.white
        : theme.typography.ink.black,
  getShadow:
    (depthIndex: number, color = '#000000') =>
    ({ theme }: ThemeProps<Theme>) =>
      `${theme.shadow[depthIndex]} ${color}`
}

export const focusoutline = (pseudoel?: ':after' | ':before') => css`
  &${pseudoel || ''} {
    border: 1px solid transparent;
    outline: 3px solid transparent;
  }
  &:focus${pseudoel || ''} {
    border-color: ${ThemeResolver.getColor('coralblue', '300')}b8;
    outline-color: ${ThemeResolver.getColor('coralblue', '300')}b8;
  }
`
export const raise = (
  depthIndex: number,
  on: string[] = [':focus', ':hover'],
  condition: boolean = true
) =>
  condition &&
  css`
    ${on.map(
      (modif) =>
        css`
          &${modif} {
            box-shadow: ${ThemeResolver.getShadow(depthIndex, '#00000020')};
          }
        `
    )}
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
  width?: string | { max?: string; min?: string }
}

export type ContainerProps = RectProps & {
  scale?: 'sm' | 'md' | 'lg'
}

export const container = ({
  height = 'auto',
  scale = 'md',
  width = 'auto'
}: ContainerProps = {}) => css`
  font-size: ${ThemeResolver.getBaseFontSize(scale)};
  height: ${height};
  overflow: hidden;
  padding: ${ThemeResolver.getContentPadding()};
  position: relative;
  ${typeof width === 'string'
    ? `width: ${width};`
    : `min-width: ${width.min || 'unset'}; max-width: ${width.max || 'unset'};`}
`

export type SurfaceProps = RectProps & {
  accent?: string
  raised?: Record<string, number>
  rounded?: boolean
  scale?: Scale
}

export const surface = ({
  accent = 'primary',
  height = 'auto',
  rounded = true,
  scale = 'md',
  width = 'auto'
}: SurfaceProps = {}) => css`
  ${container({ height, scale, width })}
  background-color: ${ThemeResolver.getAccentColor(accent)};
  border-radius: ${ThemeResolver.getBorderRadius(rounded)};
  color: ${ThemeResolver.getInkForAccentedSurface(accent)};
`
