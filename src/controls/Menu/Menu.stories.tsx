import * as icons from '@fortawesome/free-solid-svg-icons'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import React, { useCallback, useRef, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { Menu, ActionItem, ItemList, Section } from './Menu'
import defaultTheme from '../../theme/default'

export default {
  title: 'Menus',
  component: Menu
} as ComponentMeta<typeof Menu>

const VariantsTemplate: ComponentStory<typeof Menu> = (args) => {
  const [value, setValue] = useState('Select a dropdown item')
  const [contextMenuOpen, setContextMenuOpen] = useState(false)
  const triggerRef = useRef<HTMLDivElement>(null)
  const onClick = useCallback(({ target }) => {
    setValue('I like ' + target.textContent)
    args.onClick && args.onClick({ target })
  }, [])
  const onContextMenuButtonClicked = useCallback((evt: React.MouseEvent) => {
    evt.stopPropagation()
    evt.preventDefault()
    setContextMenuOpen(true)
  }, [])
  return (
    <ThemeProvider theme={defaultTheme}>
      <div
        contentEditable
        onContextMenu={onContextMenuButtonClicked}
        ref={triggerRef}
        style={{ padding: '10px 20px' }}
      >
        Right click on this text
      </div>
      <Menu open={contextMenuOpen} triggerEl={triggerRef && triggerRef.current}>
        <ItemList>
          <ActionItem onClick={onClick}>Select All</ActionItem>
          <Section>Edit</Section>
          <ActionItem icon={icons.faCut} onClick={onClick}>
            Cut
          </ActionItem>
          <ActionItem icon={icons.faCopy} onClick={onClick}>
            Copy
          </ActionItem>
          <ActionItem icon={icons.faPaste} disabled>
            Paste
          </ActionItem>
          <Section>Align</Section>
          <ActionItem icon={icons.faAlignLeft} onClick={onClick}>
            Left
          </ActionItem>
          <ActionItem icon={icons.faAlignCenter} onClick={onClick}>
            Center
          </ActionItem>
          <ActionItem icon={icons.faAlignRight} onClick={onClick}>
            Right
          </ActionItem>
        </ItemList>
      </Menu>
    </ThemeProvider>
  )
}

export const Variants = VariantsTemplate.bind({})
