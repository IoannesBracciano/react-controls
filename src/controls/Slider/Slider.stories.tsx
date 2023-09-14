import { ComponentStory, ComponentMeta } from '@storybook/react'
import React, { useCallback, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { Slider } from './Slider'
import defaultTheme from '../../theme/default'

export default {
  title: 'Sliders',
  component: Slider,
  parameters: {
    layout: 'centered'
  }
} as ComponentMeta<typeof Slider>

const VariantsTemplate: ComponentStory<typeof Slider> = (args) => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <div style={{ height: '100px', width: '100px', paddingTop: '50px' }}>
        <Slider accent={args.accent} size={args.size} />
      </div>
    </ThemeProvider>
  )
}

export const Variants = VariantsTemplate.bind({})

const SizesTemplate: ComponentStory<typeof Slider> = () => (
  <ThemeProvider theme={defaultTheme}>
    <div style={{ height: '200px', width: '300px' }}>
      <Slider
        accent='primary'
        range={[18, 36]}
        size='sm'
        style={{ display: 'block' }}
      />
      <Slider
        accent='secondary'
        range={[0, 10]}
        size='md'
        step={1}
        style={{ display: 'block' }}
      />
      <Slider
        accent='success'
        range={[87.5, 108.0]}
        size='lg'
        step={0.05}
        style={{ display: 'block' }}
      />
    </div>
  </ThemeProvider>
)

export const Sizes = SizesTemplate.bind({})
