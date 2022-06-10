import './typography.css'

const palette = {
  black: '#000000',
  blue: {
    300: '#00e2ff'
  },
  coralblue: {
    300: '#26ccff',
    500: '#08b9ee'
  },
  gray: {
    100: '#ecf0f8',
    700: '#95a3ab'
  },
  green: {
    500: '#09b334'
  },
  orange: {
    500: '#e7881b'
  },
  purple: {
    500: '#7f1eed'
  },
  red: {
    500: '#d02547'
  },
  white: '#ffffff',
  yellow: {
    500: '#ffda2e'
  }
}

const accent = {
  error: palette.red[500],
  primary: palette.purple[500],
  secondary: palette.gray[700],
  success: palette.green[500],
  warning: palette.orange[500]
}

const border = {
  radius: ['0', '1.2em']
}

const layout = {
  content: {
    padding: '0.5em 1.1em'
  },
  spacing: {
    comfy: ['1.2em', '0.4em'],
    compact: ['0.8em', '0.2em']
  }
}

const shadow = ['0 0.1em 0.2em 0.1em', '0 0.1em 0.5em 0.2em', '0 0 0 0']

const typography = {
  font: {
    face: "'Lato', sans-serif",
    size: {
      lg: '15pt',
      md: '12pt',
      sm: '10pt'
    }
  },
  ink: {
    black: palette.black,
    white: palette.white
  }
}

export default {
  accent,
  border,
  layout,
  palette,
  shadow,
  typography
}
