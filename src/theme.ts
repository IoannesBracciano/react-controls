export const light = {
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
    invertedSpotlight: `
      radial-gradient(
        circle,
        rgba(223, 255, 135, 0.175) 0%,
        rgba(160, 236, 217, 0.403) 47%,
        rgba(154, 255, 231, 0) 100%
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
    highlight: {
      attention: '#fffece',
      danger: '#ffe0d6',
      primary: '#f3feea',
      secondary: '#f3feea'
    },
    radiate: {
      attention: '#f8d088',
      danger: '#f89191',
      primary: '#88f8d2',
      secondary: '#88f8d2'
    },
    shadow: {
      attention: '#cebf87',
      danger: '#cca397',
      primary: '#abe0ce',
      secondary: '#d9dcdb'
    }
  },
  typography: {
    color: {
      attention: '#656123',
      danger: '#771a1a',
      primary: '#387769',
      secondary: '#387769'
    }
  }
}
