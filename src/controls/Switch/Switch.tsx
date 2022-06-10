import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { brightness, container, focusoutline, rect, solid } from '../../theming'

const StyledInput = styled('input')<
  Omit<SwitchProps, 'size'> & { scale: 'sm' | 'md' | 'lg' | undefined }
>`
  ${({ scale }) =>
    container({
      spacing: 0,
      scale
    })}
  ${focusoutline(':after')}
  ${brightness('103%', [':focus', ':hover'])}
  ${brightness('97%', [':active'])}
  -webkit-tap-highlight-color: transparent;
  appearance: none;
  cursor: pointer;
  font-family: 'Lato', sans-serif;

  &:focus,
  &:focus-visible {
    outline: none;
  }

  &:after {
    ${solid('#dbdbdb')}
    ${rect({
      height: '1.4em',
      radiusIndex: 1,
      width: '2.2em'
    })}
    content: '';
    display: block;
    transition: all 0.15s;
  }

  &:before {
    ${solid('#fafafa')}
    ${rect({
      height: '1em',
      radiusIndex: 1,
      width: '1em'
    })}
    content: '';
    display: block;
    left: 0.25em;
    position: absolute;
    top: 0.25em;
    transition: all 0.15s;
    transition: left 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    z-index: 9;
  }

  &:checked:after {
    ${({ accent: variant }) => solid(variant)};
  }

  &:focus::before,
  &:hover:before {
    box-shadow: 0 0 0.2em 0 #00000020;
  }

  &:checked:before {
    left: 1.05em;
  }
`

export interface SwitchProps {
  on?: boolean
  onToggle?: (isOn: boolean) => void
  size?: 'sm' | 'md' | 'lg'
  style?: React.CSSProperties
  accent: 'error' | 'primary' | 'secondary' | 'success' | 'warning'
}

export const Switch = ({ on, onToggle, size, style, accent }: SwitchProps) => {
  const [isOn, setIsOn] = useState(!!on)
  const onChange = useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(() => {
    const _isOn = !isOn
    setIsOn(_isOn)
    typeof onToggle === 'function' && onToggle(_isOn)
  }, [isOn])

  return (
    <StyledInput
      accent={accent}
      onChange={onChange}
      scale={size}
      style={style}
      type='checkbox'
    />
  )
}

Switch.defaultProps = {
  accent: 'primary',
  size: 'md'
}
