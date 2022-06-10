import { ComponentStory, ComponentMeta } from '@storybook/react'
import React, { useCallback, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { Switch } from './Switch'
import defaultTheme from '../../theme/default'

export default {
  title: 'Switches',
  component: Switch,
  parameters: {
    layout: 'centered'
  }
} as ComponentMeta<typeof Switch>

const VariantsTemplate: ComponentStory<typeof Switch> = (args) => {
  const [switchPosition, setSwitchPosition] = useState('off')
  const onToggle = useCallback((isOn: boolean) => {
    setSwitchPosition(isOn ? 'on' : 'off')
    args.onToggle && args.onToggle(isOn)
  }, [])
  return (
    <ThemeProvider theme={defaultTheme}>
      <label
        style={{
          alignItems: 'center',
          display: 'flex',
          fontFamily: 'Lato',
          justifyContent: 'space-between',
          width: '10em'
        }}
      >
        Switch is {switchPosition}
        <Switch accent={args.accent} size={args.size} onToggle={onToggle} />
      </label>
    </ThemeProvider>
  )
}

export const Variants = VariantsTemplate.bind({})

const SizesTemplate: ComponentStory<typeof Switch> = () => (
  <ThemeProvider theme={defaultTheme}>
    <Switch accent='primary' size='sm' style={{ display: 'block' }} />
    <Switch accent='secondary' size='md' style={{ display: 'block' }} />
    <Switch accent='success' size='lg' style={{ display: 'block' }} />
  </ThemeProvider>
)

export const Sizes = SizesTemplate.bind({})
