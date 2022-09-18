import { ComponentStory, ComponentMeta } from '@storybook/react'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { TextInput } from './TextInput'
import { Button } from '../Button'
import defaultTheme from '../../theme/default'

export default {
  title: 'Text',
  component: TextInput
} as ComponentMeta<typeof TextInput>

const ShowcaseTemplate: ComponentStory<typeof TextInput> = () => (
  <ThemeProvider theme={defaultTheme}>
    <div style={{ flexDirection: 'column', display: 'flex' }}>
      <TextInput label='Username or e-mail' />
      <TextInput hide label='Passphrase' style={{ display: 'block' }} />
      <Button accent='primary'>Sign in</Button>
    </div>
  </ThemeProvider>
)

export const Showcase = ShowcaseTemplate.bind({})
Showcase.parameters = {
  layout: 'centered'
}
