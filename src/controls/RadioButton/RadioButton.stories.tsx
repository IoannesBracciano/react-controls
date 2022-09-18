import { ComponentStory, ComponentMeta } from '@storybook/react'
import React, { useCallback, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { RadioButton } from './RadioButton'
import defaultTheme from '../../theme/default'

export default {
  title: 'Radio Buttons',
  component: RadioButton,
  parameters: {
    layout: 'centered'
  }
} as ComponentMeta<typeof RadioButton>

const VariantsTemplate: ComponentStory<typeof RadioButton> = (args) => {
  const [value, setValue] = useState('Select a fruit')
  const onToggle = useCallback(({ group, value }) => {
    setValue('I like ' + value)
    args.onToggle && args.onToggle({ group, value })
  }, [])
  return (
    <ThemeProvider theme={defaultTheme}>
      <h2 style={{ fontFamily: 'Lato' }}>{value}</h2>
      <label
        style={{
          alignItems: 'center',
          display: 'flex',
          fontFamily: 'Lato',
          justifyContent: 'space-between',
          width: '10em',
          margin: '5px 0'
        }}
      >
        Bananas
        <RadioButton
          accent={args.accent}
          name='fruits'
          onToggle={onToggle}
          size={args.size}
          value='bananas'
        />
      </label>
      <label
        style={{
          alignItems: 'center',
          display: 'flex',
          fontFamily: 'Lato',
          justifyContent: 'space-between',
          width: '10em',
          margin: '5px 0'
        }}
      >
        Apples
        <RadioButton
          accent={args.accent}
          name='fruits'
          onToggle={onToggle}
          size={args.size}
          value='apples'
        />
      </label>
      <label
        style={{
          alignItems: 'center',
          display: 'flex',
          fontFamily: 'Lato',
          justifyContent: 'space-between',
          width: '10em',
          margin: '5px 0'
        }}
      >
        Pears
        <RadioButton
          accent={args.accent}
          name='fruits'
          onToggle={onToggle}
          size={args.size}
          value='pears'
        />
      </label>
    </ThemeProvider>
  )
}

export const Variants = VariantsTemplate.bind({})
