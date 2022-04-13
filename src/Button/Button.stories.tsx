import { ComponentStory, ComponentMeta } from '@storybook/react'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { Button } from './Button'
import { light } from '../theme'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Buttons',
  component: Button
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  //   argTypes: {
  //     backgroundColor: { control: 'color' }
  //   }
} as ComponentMeta<typeof Button>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// const Template: ComponentStory<typeof Button> = (args) => (
//   <ThemeProvider theme={light}>
//     <Button {...args} />
//   </ThemeProvider>
// )

const ShowcaseTemplate: ComponentStory<typeof Button> = () => (
  <ThemeProvider theme={light}>
    <Button label='Primary' variant='primary' />
    <Button label='Secondary' variant='secondary' />
    <Button label='Attention' variant='attention' />
    <Button label='Danger' variant='danger' />
  </ThemeProvider>
)

export const Showcase = ShowcaseTemplate.bind({})
