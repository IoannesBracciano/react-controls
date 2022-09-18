// import * as SbReact from '@storybook/react'
import * as icons from '@fortawesome/free-solid-svg-icons'
import React, { useCallback, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { Button } from '.'
import { ButtonGroup } from '../../layout/button-group/ButtonGroup'
import defaultTheme from '../../theme/default'
import { ButtonProps } from './Button'

export default {
  title: 'Buttons',
  component: Button,
  argTypes: {
    icon: {
      control: 'select',
      mapping: icons,
      options: Object.keys(icons)
    }
  },
  parameters: {
    layout: 'centered'
  }
}

// const pageContents = [
//   'Buttons enable users to perform actions on click.',
//   'They come in many variations and states that help communicate their function and guide the user to the most common action.',
//   'The main action can be emphasized by using a button with the primary accent background color, like the "Next" button in this dialog.',
//   'Secondary actions can be assigned to buttons with less striking background colors, like the "Previous" button in this dialog.'
// ]

// const ShowcaseComponent = () => {
//   const [pageNum, setPageNum] = useState(0)
//   const onNextButtonClicked = useCallback(() => {
//     setPageNum((p) => p + 1)
//   }, [])
//   const onPreviousButtonClicked = useCallback(() => {
//     setPageNum((p) => p - 1)
//   }, [])

//   return (
//     <div
//       style={{ display: 'flex', fontFamily: 'Lato', justifyContent: 'center' }}
//     >
//       <div
//         style={{
//           backgroundColor: '#efefef',
//           borderRadius: '32px',
//           boxShadow: 'rgb(0 0 0 / 35%) 0px 10px 80px 10px',
//           margin: '30px',
//           padding: '20px 30px',
//           flex: '1 0 auto',
//           maxWidth: '480px',
//           height: '200px',
//           display: 'flex',
//           flexDirection: 'column'
//         }}
//       >
//         <h2 style={{ marginTop: '10px', marginBottom: '0' }}>Buttons</h2>
//         <span style={{ color: '#333', fontSize: '12pt', flex: '1 0 auto' }}>
//           <p>{pageContents[pageNum]}</p>
//         </span>
//         <div
//           style={{
//             display: 'flex',
//             flexDirection: 'row-reverse',
//             marginTop: '20px'
//           }}
//         >
//           <Button
//             accent='primary'
//             disabled={pageNum === pageContents.length - 1}
//             onClick={onNextButtonClicked}
//           >
//             Next
//           </Button>
//           <Button
//             accent='secondary'
//             disabled={pageNum === 0}
//             flat
//             onClick={onPreviousButtonClicked}
//           >
//             Previous
//           </Button>
//         </div>
//       </div>
//     </div>
//   )
// }

// const ShowcaseTemplate = () => (
//   <ThemeProvider theme={defaultTheme}>
//     <ShowcaseComponent />
//   </ThemeProvider>
// )

const ShowcaseTemplate = ({
  icon,
  ...props
}: ButtonProps & { label?: string }) => (
  <ThemeProvider theme={defaultTheme}>
    <ButtonGroup>
      <Button {...props}>{props.label}</Button>
      <Button icon={icon || icons.faFrog} {...props} />
    </ButtonGroup>
  </ThemeProvider>
)

export const Showcase = ShowcaseTemplate.bind({})
Showcase.args = {
  ...Showcase.args,
  accent: 'primary',
  disabled: false,
  flat: false,
  label: 'Hey there',
  size: 'md',
  spinning: false
}

const BusyContextTemplate = () => {
  const [busy, setBusy] = useState({
    attention: false,
    danger: false,
    primary: false,
    secondary: false,
    success: false
  })
  const onClick = useCallback((variant: string) => {
    setBusy((busy) => ({ ...busy, [variant]: true }))
    setTimeout(() => {
      setBusy((busy) => ({ ...busy, [variant]: false }))
    }, 3000)
  }, [])
  return (
    <ThemeProvider theme={defaultTheme}>
      <Button
        spinning={busy.primary}
        icon={icons.faDownload}
        onPress={() => onClick('primary')}
        size='lg'
      >
        Download
      </Button>
      <Button
        spinning={busy.secondary}
        icon={icons.faSave}
        onPress={() => onClick('secondary')}
        accent='success'
        size='md'
      />
      <Button
        spinning={busy.attention}
        icon={icons.faHdd}
        onPress={() => onClick('attention')}
        accent='warning'
        size='md'
      >
        Clean
      </Button>
      <Button
        spinning={busy.danger}
        onPress={() => onClick('danger')}
        size='sm'
        accent='error'
        flat
      >
        Remove
      </Button>
    </ThemeProvider>
  )
}

export const BusyContext = BusyContextTemplate.bind({})
