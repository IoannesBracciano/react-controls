import React, { useCallback } from 'react'
import styled, { css } from 'styled-components'
import { brightness, container, focusoutline, rect, solid } from '../../theming'

const StyledInput = styled('input')<
  Omit<RadioButtonProps, 'checked' | 'size'> & {
    scale: 'sm' | 'md' | 'lg' | undefined
  }
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
  transition: all 0.15s;
  ${({ theme }) => {
    const grayLight = theme.palette.gray['30']
    const grayLighter = theme.palette.gray['5']
    return css`
      &:after {
        ${solid(grayLighter)}
        ${rect({
          height: '1em',
          radiusIndex: 3,
          width: '1em'
        })}
        border: 1px solid ${grayLight};
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
        opacity: 0.5;
        position: absolute;
        top: 0.33em;
        left: 0.3em;
        z-index: 9;
        text-align: center;
        width: 0.5em;
        height: 0.5em;
        transition: all 0.15s;
      }
    `
  }}

  &:focus::before,
  &:hover:before {
    box-shadow: 0 0 0.2em 0 #00000020;
  }

  &:checked:before {
    opacity: 1;
  }

  ${({ accent, theme }) => {
    const bg = theme.background.darker[accent]
    return css`
      &:checked:after {
        ${solid(bg)}
      }
    `
  }}
`

export interface RadioButtonProps {
  accent: 'error' | 'primary' | 'secondary' | 'success' | 'warning'
  /**
   * The name and identifier of the group of radio buttons this control
   * belongs to.
   */
  name?: string
  /**
   * Get notified whenever selection is changed inside the radio button
   * group.
   */
  onToggle?: (selection: { group: string; value: any }) => void
  /**
   * Choose from 3 standard control sizes calculated based on the
   * applied theme's base font size.
   */
  size?: 'sm' | 'md' | 'lg'
  /**
   * The associated value.
   */
  value?: any
}

/**
 * Radio buttons are used to present a small number of mutually
 * exclusive options to users who are usually called to compare
 * between all of them before deciding wich item to choose.
 */
export const RadioButton = ({
  accent = 'primary',
  name = '',
  onToggle,
  size = 'md',
  value
}: RadioButtonProps) => {
  const onChange = useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(() => {
    typeof onToggle === 'function' && onToggle({ group: name, value })
  }, [])

  return (
    <StyledInput
      accent={accent}
      name={name}
      onChange={onChange}
      scale={size}
      type='radio'
      value={value}
    />
  )
}
