import { ComponentStory, ComponentMeta } from '@storybook/react'
import React, { useCallback, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { Dropdown, Option } from './Dropdown'
import defaultTheme from '../../theme/default'

export default {
  title: 'Dropdowns',
  component: Dropdown,
  parameters: {
    layout: 'centered'
  }
} as ComponentMeta<typeof Dropdown>

const VariantsTemplate: ComponentStory<typeof Dropdown> = (args) => {
  // const [checked, setChecked] = useState('unchecked')
  // const onToggle = useCallback((isChecked: boolean) => {
  //   setChecked(isChecked ? 'checked' : 'unchecked')
  //   args.onToggle && args.onToggle(isChecked)
  // }, [])
  return (
    <ThemeProvider theme={defaultTheme}>
      <div style={{ height: '200px' }}>
        <Dropdown label='Select city' style={{ width: '220px' }}>
          <Option value='BCN'>Barcelona</Option>
          <Option value='MAD'>Madrid</Option>
          <Option value='MLG'>Malaga</Option>
          <Option value='SVL'>Sevilla</Option>
          <Option value='ZGZ'>Zaragoza</Option>
        </Dropdown>
      </div>
    </ThemeProvider>
  )
}

export const Variants = VariantsTemplate.bind({})
