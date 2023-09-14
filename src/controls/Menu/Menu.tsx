import pt from 'prop-types'
import React, { memo, RefObject, useCallback, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { container, raise, solid } from '../../theming'
import { MaterialAcrylic } from '../../theming/lucidui'
import { Button } from '../Button'

export interface ActionItemProps {
  accent?: 'error' | 'primary' | 'secondary' | 'success' | 'warning'
  children?: string
  disabled?: boolean
  icon?: any
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export const ActionItem = ({
  accent,
  children,
  disabled,
  icon,
  onClick
}: ActionItemProps) => {
  return (
    <li className='option'>
      <Button
        accent={accent}
        disabled={disabled}
        flat
        icon={icon}
        onPress={onClick}
      >
        {children}
      </Button>
    </li>
  )
}

ActionItem.defaultProps = {
  accent: 'primary',
  disabled: false
}

export interface SectionProps {
  children?: string
}

export const Section = ({ children }: SectionProps) => {
  return (
    <li className='section'>
      <Button accent='secondary' size='sm' flat disabled>
        {children}
      </Button>
    </li>
  )
}

export const ItemList = styled('ul')`
  list-style: none;
  margin: 0.3em 0;
  padding: 0.1em 0;
  overflow: hidden;

  & > li.option {
    display: block;
  }

  & > li.section {
    margin: 0.5em 0 -0.3em 0em;
    border-top: 1px solid #0000000a;
  }

  & > li.option > button,
  & > li.section > button {
    border-radius: 0;
    color: #000;
    width: 103%;
    text-align: start;
    margin: 1px -1px;
    padding: 0.5em 1.1em;
  }

  & > li.option > button > span {
    font-weight: normal;
  }

  & > li.section > button > span {
    opacity: 1;
    font-size: 9pt;
  }
`

const getPortal = (id: string) => {
  const portalEl = document.getElementById(id)
  if (!portalEl) {
    const el = document.createElement('div')
    el.id = id
    return el
  }
  return portalEl
}

export interface MenuProps {
  align?:
    | 'lefttop'
    | 'leftbottom'
    | 'topleft'
    | 'topright'
    | 'righttop'
    | 'rightbottom'
    | 'bottomleft'
    | 'bottomright'
  anchor?: 'triggerEl' | 'mouse'
  children?: any
  className?: string
  open?: boolean
  triggerEl?: HTMLElement | null
  triggerEvent?: 'click' | 'context' | 'hover'
}

const _Menu = ({
  align,
  children,
  className,
  open,
  triggerEl,
  triggerEvent
}: MenuProps) => {
  const [top, setTop] = useState(0)
  const [left, setLeft] = useState(0)
  const [_open, setOpen] = useState(open)
  const [triggerElRect, setTriggerElRect] = useState(new DOMRect())
  useEffect(() => {
    if (triggerEl) {
      const triggerElRect = triggerEl.getBoundingClientRect()
      const triggerElTop = triggerElRect.top
      const triggerElHeight = triggerElRect.height
      const triggerElLeft = triggerElRect.left
      const triggerElWidth = triggerElRect.width
      setTriggerElRect(triggerElRect)
      setTop(triggerElTop + triggerElHeight)
      setLeft(triggerElWidth / 2)
      const openContextMenuListener = (ev: MouseEvent) => {
        const mousex = ev.pageX
        const mousey = ev.pageY
        setTop(mousey + 10)
        setLeft(mousex)
        setOpen(true)
      }
      triggerEl.addEventListener('contextmenu', openContextMenuListener)
      return () => {
        triggerEl.removeEventListener('contextmenu', openContextMenuListener)
      }
    }
  }, [triggerEl])

  useEffect(() => {
    const closeMenuListener = () => {
      setTimeout(() => {
        setOpen(false)
      }, 120);
    }
    window.addEventListener('click', closeMenuListener)
    return () => {
      window.removeEventListener('click', closeMenuListener)
    }
  }, [])

  return ReactDOM.createPortal(
    <div
      className={className}
      style={{
        display: _open ? 'block' : 'none',
        left: `${left}px`,
        top: `${top}px`
      }}
    >
      <ItemList>{children}</ItemList>
    </div>,
    getPortal('portal')
  )
}

_Menu.defaultProps = {
  anchor: 'triggerEl',
  align: 'bottomleft',
  open: false,
  triggerEvent: 'click'
}

export const Menu = styled(_Menu)`
  ${container({ rounded: 2, spacing: 7 })}
  ${raise(5)}
  ${MaterialAcrylic({ color: '#fcffff' })}

  min-width: 10em;
  padding: 0;
  position: absolute;
  width: fit-content;
  z-index: 99;
`
