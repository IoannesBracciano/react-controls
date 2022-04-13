import React, { MouseEventHandler, useCallback, useState } from 'react'
import styled from 'styled-components'
import { useRect } from '../hooks'

export interface ButtonProps {
  className?: string | undefined
  label: string
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined
  size?: 'sm' | 'md' | 'lg' | undefined
  variant: 'attention' | 'danger' | 'primary' | 'secondary'
}

const _Button = ({ className, onClick, label, variant }: ButtonProps) => {
  const [ref, rect] = useRect<HTMLButtonElement>()
  const [bgPosX, setBgPosX] = useState(0)
  const onMouseMove = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (ev) => {
      const mousePageX = ev.pageX
      const halfWidth = rect.width / 2
      const mouseRelX = mousePageX - rect.left
      setBgPosX(-halfWidth + mouseRelX)
    },
    [rect]
  )
  return (
    <button
      className={`${className} ${variant}`}
      onClick={onClick}
      onMouseMove={onMouseMove}
      ref={ref}
      role='button'
      style={{ backgroundPosition: `${bgPosX}px 0` }}
      type='button'
    >
      {label}
    </button>
  )
}

/**
 * Button
 *
 * Buttons enable users to perform actions with a push (click). They
 * come in various colors and sizes to choose depending on the use case.
 */
export const Button = styled(_Button)`
  background-color: ${({ theme, variant }) => theme.palette[variant]};
  background-repeat: no-repeat !important;
  border: 1px solid ${({ theme, variant }) => theme.effects.highlight[variant]}; // #eafef9;
  border-radius: 4px;
  box-shadow: 0 0.5px 0 0.75px
    ${({ theme, variant }) => theme.effects.shadow[variant]};
  color: ${({ theme, variant }) => theme.typography.color[variant]};
  font-size: ${({ size }) => (size === 'lg' ? '13pt;' : '11pt;')};
  font-weight: bold;
  padding: ${({ size }) =>
    size === 'md' ? '8px 24px' : size === 'lg' ? '8px 32px' : '6px 16px'};

  transition: border 0.125s, outline 0.175s, box-shadow 0.125s;
  &:hover {
    background: ${({ theme, variant }) =>
        theme.gradients.spotlight(theme.effects.highlight[variant])},
      ${({ theme, variant }) => theme.palette[variant]};
    border-color: #fffef1;
    box-shadow: 0 0.5px 0 1px
      ${({ theme, variant }) => theme.effects.radiate[variant]};
    outline: 0 solid #ffffff00;
  }
  &:active {
    background: ${({ theme }) => theme.gradients.invertedSpotlight},
      ${({ theme, variant }) => theme.palette[variant]};
    box-shadow: 0 0 0 0.5px
      ${({ theme, variant }) => theme.effects.shadow[variant]};
  }
  &:focus {
    outline: 4px solid #74ffd9c2;
  }
`

Button.defaultProps = {
  size: 'sm',
  variant: 'primary'
}
