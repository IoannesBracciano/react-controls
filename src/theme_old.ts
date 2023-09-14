export const light = {
  button: {
    flat: {
      primary: {
        bg: '#edf9f5',
        color: '#5e8d90',
        hover: {
          bg: '#e9fef7',
          color: '#19bca5'
        },
        active: {
          bg: 'radial-gradient(circle, #ffffff45 0%, #9fffde5e 47%, #dfffff63 87%, #d9dcdb00 90%), #f0fffa;',
          color: '#2d9b83d9'
        }
      },
      secondary: {
        bg: '#f0fbf8',
        color: '#3d7a73',
        hover: {
          bg: '#f3fffc',
          color: '#2d9986'
        },
        active: {
          bg: 'radial-gradient(circle, #ffffff42 0%, #bdf7ff52 47%, #c5faff2e 80%, #d9dcdb00 90%), #fafafa;',
          color: '#2d9797cf'
        }
      }
    }
  },
  gradients: {
    // spotlight: (color: string) => `
    //   radial-gradient(
    //     circle,
    //     rgba(243, 255, 234, 1) 0%,
    //     rgba(255, 255, 255, 0) 100%)
    // `,
    spotlight: (color: string) => `
      radial-gradient(
        circle,
        ${color}ec 0%,
        ${color}00 100%)
    `,
    // invertedSpotlight: `
    //   radial-gradient(
    //     circle,
    //     rgba(223, 255, 135, 0.175) 0%,
    //     rgba(160, 236, 217, 0.403) 47%,
    //     rgba(154, 255, 231, 0) 100%
    //   )
    // `
    invertedSpotlight: (color: string) => `
      radial-gradient(
        circle,
        ${color}20 0%,
        ${color}6e 30%,
        ${color}00 100%
      )
    `
  },
  palette: {
    attention: '#fff0b8',
    danger: '#ffd1bf',
    primary: '#d3fff4',
    secondary: '#fafafa'
  },
  effects: {
    darken: {
      attention: '#f6e9b6',
      danger: '#f4c1b2',
      primary: '#d0f8ee',
      secondary: '#f5f5f5'
    },
    highlight: {
      attention: '#fffece',
      danger: '#ffe0d6',
      primary: '#f3feea',
      secondary: '#f3feea'
    },
    radiate: {
      attention: '#fae820',
      danger: '#ffa5a5',
      primary: '#88f8d2',
      secondary: '#88f8d2'
    },
    shadow: {
      attention: '#e1d29a',
      danger: '#dcbcb3',
      primary: '#abe0ce',
      secondary: '#d9dcdb'
    }
  },
  typography: {
    color: {
      attention: '#656123',
      danger: '#771a1a',
      primary: '#387769',
      secondary: '#5c7474'
    }
  }
}

type Variant = 'attention' | 'danger' | 'primary' | 'secondary' | 'success'

const varbasic: Record<Variant, string> = {
  attention: '#f4e322',
  danger: '#d02547',
  primary: '#7f1eed',
  secondary: '#dcddfc',
  success: '#31f290'
}

type Rgba = {
  r(): number
  g(): number
  b(): number
  a(): number
  toArray(): readonly [number, number, number, number]
  toString(): string
}

type RgbaConstructorArgs = [string] | [number, number, number, number?]

export function darken(color: Rgba, by = 0.1): Rgba {
  const [r, g, b, a] = color.toArray()
  return rgba(r - r * by, g - g * by, b - b * by, a)
}

export function lighten(color: Rgba, by = 0.1): Rgba {
  const [r, g, b, a] = color.toArray()
  return rgba(r + r * by, g + g * by, b + b * by, a)
}

export function fade(color: Rgba, by = 0.1): Rgba {
  const [r, g, b, a] = color.toArray()
  return rgba(r, g, b, a - a * by)
}

export function getVariantBaseColor(variant: Variant = 'primary') {
  return varbasic[variant]
}

export function getVariantTextColor(variant: Variant = 'primary') {
  switch (variant) {
    case 'attention':
    case 'secondary':
    case 'success':
      return '#000000e5'
    case 'danger':
    case 'primary':
      return '#ffffffea'
  }
}

export function hex(...rgba: [number, number, number, number?]) {
  return (
    '#' +
    rgba
      .map((v = 255) => v.toString(16))
      .join()
      .padEnd(8, 'f')
      .substring(0, 8)
  )
}

export function rgba(...args: RgbaConstructorArgs): Rgba {
  if (args.length === 1) {
    const [r, g, b, a] = args[0]
      .replace('#', '')
      .padEnd(8, 'f')
      .substring(0, 8)
      .split(/(..)/g)
      .filter(Boolean)
      .map((v) => parseInt(v, 16))
    return construct(r, g, b, a)
  }
  return construct(...args)

  function construct(_r: number, _g: number, _b: number, _a = 255) {
    const { max, min } = Math
    const [r, g, b, a] = [_r, _g, _b, _a].map((v) => min(255, max(0, v)))
    return {
      r() {
        return r
      },
      g() {
        return g
      },
      b() {
        return b
      },
      a() {
        return a
      },
      toArray() {
        return [r, g, b, a] as const
      },
      toString() {
        return `rgba(${r}, ${g}, ${b}, ${a / 255.0})`
      }
    }
  }
}
