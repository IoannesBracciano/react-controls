import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import {
  brightness,
  container,
  focusoutline,
  raise,
  rect,
  solid
} from '../../theming'

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
    ${({ theme }) => {
      const solidBgLightGray = theme.palette.gray['30']
      return solid(solidBgLightGray)
    }}
    ${rect({
      height: '1.4em',
      radiusIndex: 3,
      width: '2.2em'
    })}
    content: '';
    display: block;
    transition: all 0.15s;
  }

  &:before {
    ${solid('#ffffff')}
    ${rect({
      height: '1em',
      radiusIndex: 3,
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
    ${({ accent, theme }) => {
      const bg = theme.background.solid[accent]
      return solid(bg)
    }}
  }

  &:focus::before,
  &:hover:before {
    ${raise(1, 'neutral')}
  }

  &:checked:before {
    left: 1.05em;
  }
`

export interface SwitchProps {
  /**
   * Set the initial state of the switch.
   */
  on?: boolean
  /**
   * Get notified whenever the state of the switch is toggled.
   */
  onToggle?: (isOn: boolean) => void
  /**
   * Choose from 3 standard control sizes calculated based on the
   * applied theme's base font size.
   */
  size?: 'sm' | 'md' | 'lg'
  style?: React.CSSProperties
  /**
   * Choose the color variation of the control.
   */
  accent: 'error' | 'primary' | 'secondary' | 'success' | 'warning'
}

/**
 * Switches let users turn things on and off or less often switch
 * between other binary opposite states.
 */
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
