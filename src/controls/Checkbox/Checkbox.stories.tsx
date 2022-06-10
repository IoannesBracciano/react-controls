import { ComponentStory, ComponentMeta } from '@storybook/react'
import React, { useCallback, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { Checkbox } from './Checkbox'
import defaultTheme from '../../theme/default'

export default {
  title: 'Checkboxes',
  component: Checkbox,
  parameters: {
    layout: 'centered'
  }
} as ComponentMeta<typeof Checkbox>

const VariantsTemplate: ComponentStory<typeof Checkbox> = (args) => {
  const [checked, setChecked] = useState('unchecked')
  const onToggle = useCallback((isChecked: boolean) => {
    setChecked(isChecked ? 'checked' : 'unchecked')
    args.onToggle && args.onToggle(isChecked)
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
        Checkbox is {checked}
        <Checkbox accent={args.accent} size={args.size} onToggle={onToggle} />
      </label>
    </ThemeProvider>
  )
}

export const Variants = VariantsTemplate.bind({})
