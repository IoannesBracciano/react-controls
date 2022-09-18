import './typography.css'

const palette = {
  black: '#000000',
  blue: {
    // https://lyft-colorbox.herokuapp.com/#steps=10#hue_start=170#hue_end=232#hue_curve=easeInOutQuad#sat_start=10#sat_end=47#sat_curve=easeOutQuad#sat_rate=88#lum_start=100#lum_end=27#lum_curve=easeOutQuad#minor_steps_map=0
    '0': '#e9fffb',
    '5': '#defdf9',
    '10': '#d4fcf6',
    '20': '#bff5f2',
    '30': '#aae7eb',
    '40': '#96cbdd',
    '50': '#82a9ca',
    '60': '#6e86b1',
    '70': '#576591',
    '80': '#40476c',
    '90': '#282c45'
  },
  merde: {
    '0': '#e1fff2',
    '5': '#d9fdee',
    '10': '#d1fbea',
    '20': '#c0f4e3',
    '30': '#aee9de',
    '40': '#9bd8d9',
    '50': '#87b6c3',
    '60': '#7090a6',
    '70': '#566a82',
    '80': '#394557',
    '90': '#1c222b'
  },
  coralblue: {
    300: '#26ccff',
    500: '#08b9ee'
  },
  gray: {
    // https://lyft-colorbox.herokuapp.com/#steps=10#hue_start=201#hue_end=198#hue_curve=easeInOutQuad#sat_start=11#sat_end=83#sat_curve=easeOutQuad#sat_rate=19#lum_start=100#lum_end=27#lum_curve=easeOutQuad#minor_steps_map=0
    '0': '#fafdff',
    '5': '#f4fafd',
    '10': '#eff7fc',
    '20': '#e2eff5',
    '30': '#d4e3eb',
    '40': '#c3d5dd',
    '50': '#afc1ca',
    '60': '#97a9b1',
    '70': '#7b8a91',
    '80': '#5b676c',
    '90': '#3a4245',
    base: '40'
  },
  green: {
    // https://lyft-colorbox.herokuapp.com/#steps=10#hue_start=147#hue_end=157#hue_curve=easeInOutQuad#sat_start=6#sat_end=83#sat_curve=easeOutQuad#sat_rate=149#lum_start=100#lum_end=35#lum_curve=easeOutQuad#minor_steps_map=0
    '0': '#e8fff2',
    '5': '#c9fde0',
    '10': '#a9fccf',
    '20': '#6df6ad',
    '30': '#3bee92',
    '40': '#14e17e',
    '50': '#00d073',
    '60': '#00b96c',
    '70': '#009d5e',
    '80': '#007c4c',
    '90': '#005937',
    base: '50'
  },
  lime: {
    // https://lyft-colorbox.herokuapp.com/#steps=10#hue_start=71#hue_end=99#hue_curve=easeInOutQuad#sat_start=4#sat_end=90#sat_curve=easeOutQuad#sat_rate=130#lum_start=100#lum_end=53#lum_curve=easeOutQuad#minor_steps_map=0
    '0': '#FDFFF2',
    '5': '#F6FED3',
    '10': '#EFFDB5',
    '20': '#DCF97A',
    '30': '#C1F249',
    '40': '#9EE923',
    '50': '#79DD07',
    '60': '#5CCD00',
    '70': '#49B800',
    '80': '#3AA000',
    '90': '#2F8700'
  },
  violet: {
    // https://lyft-colorbox.herokuapp.com/#steps=10#hue_start=283#hue_end=289#hue_curve=easeInOutQuad#sat_start=11#sat_end=83#sat_curve=easeOutQuad#sat_rate=122#lum_start=100#lum_end=35#lum_curve=easeOutQuad#minor_steps_map=0
    '0': '#f5ddff',
    '5': '#edc4fd',
    '10': '#e5acfc',
    '20': '#d57df6',
    '30': '#c655ee',
    '40': '#b835e1',
    '50': '#a81ed0',
    '60': '#960fb9',
    '70': '#80059d',
    '80': '#65007c',
    '90': '#490059',
    base: '40'
  },
  red: {
    '0': '#FFF2F2',
    '5': '#FED3D3',
    '10': '#FDB5B5',
    '20': '#F97C7A',
    '30': '#F24D49',
    '40': '#E92C23',
    '50': '#DD1607',
    '60': '#CD1300',
    '70': '#B81300',
    '80': '#A01200',
    '90': '#871000',
    base: '40'
  },
  white: '#ffffff',
  yellow: {
    // https://lyft-colorbox.herokuapp.com/#steps=10#hue_start=47#hue_end=39#hue_curve=easeInOutQuad#sat_start=7#sat_end=85#sat_curve=easeOutQuad#sat_rate=124#lum_start=100#lum_end=35#lum_curve=easeOutQuad#minor_steps_map=0
    '0': '#fffae9',
    '5': '#fdf3ce',
    '10': '#fcecb3',
    '20': '#f6db80',
    '30': '#eec854',
    '40': '#e1b132',
    '50': '#d09919',
    '60': '#b98109',
    '70': '#9d6800',
    '80': '#7c5100',
    '90': '#593a00',
    base: '50'
  }
}

// Color accents
const accent = {
  get base() {
    return {
      error: palette.red['40'],
      primary: palette.violet['40'],
      secondary: palette.merde['50'],
      success: palette.green['50'],
      warning: palette.yellow['50']
    }
  },
  get palette() {
    return {
      error: palette.red,
      primary: palette.violet,
      secondary: palette.merde,
      success: palette.green,
      warning: palette.yellow
    }
  }
}

export const background = Object.freeze({
  get solid() {
    return {
      error: accent.palette.error['40'],
      neutral: palette.gray['30'],
      primary: accent.palette.primary['40'],
      secondary: accent.palette.secondary['50'],
      success: accent.palette.success['50'],
      warning: accent.palette.warning['50']
    }
  },
  get darker() {
    return {
      error: accent.palette.error['60'],
      neutral: palette.gray['50'],
      primary: accent.palette.primary['60'],
      secondary: accent.palette.secondary['60'],
      success: accent.palette.success['70'],
      warning: accent.palette.warning['70']
    }
  }
})

export const border = Object.freeze({
  get color() {
    return {
      neutral: palette.gray['30']
    }
  },
  get radius() {
    return ['0', '0.25em', '0.5em', '1.2em']
  }
})
export const drop = Object.freeze({
  get bottom() {
    return [
      '0 0',
      '0 2px 2px 1px',
      '0 3px 4px 2px',
      '0 5px 8px 2px',
      '0 5px 12px 5px',
      '0 5px 20px 8px'
    ]
  },
  get color() {
    return {
      error: accent.palette.error['80'],
      neutral: palette.gray['80'],
      primary: accent.palette.primary['80'],
      secondary: accent.palette.secondary['80'],
      success: accent.palette.success['80'],
      warning: accent.palette.warning['80']
    }
  },
  get left() {
    return ['0 0', '-2px 0 2px 1px', '-3px 0 4px 2px', '-5px 0 8px 2px']
  },
  get right() {
    return ['0 0', '2px 0 2px  1px', '3px 0 4px 2px', '5px 0 8px 2px']
  },
  get top() {
    return ['0 0', '0 -2px 2px 1px', '0 -3px 4px 2px', '0 -5px 8px 2px']
  }
})

export const accessibilityAidsColor = palette.coralblue['300']

const spacing = {
  horizontal: [
    '0',
    '0.1em',
    '0.2em',
    '0.3em',
    '0.5em',
    '0.7em',
    '0.9em',
    '1.1em',
    '1.4em',
    '1.7em',
    '2.0em',
    '2.4em'
  ],
  vertical: [
    '0',
    '0.05em',
    '0.1em',
    '0.15em',
    '0.2em',
    '0.3em',
    '0.4em',
    '0.5em',
    '0.7em',
    '0.9em',
    '1.1em',
    '1.3em'
  ]
}

const layout = {
  content: {
    padding: ['0.5em 1.1em']
  },
  spacing: {
    comfy: ['1.2em', '0.4em'],
    compact: ['0.8em', '0.2em']
  }
}

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
    black: palette.black + 'af', //'#505050',
    white: palette.white + 'f5'
  }
}

export default {
  accent,
  background,
  border,
  drop,
  layout,
  palette,
  spacing,
  typography
}
