import React, { useCallback, useState } from 'react'
import styled, { css } from 'styled-components'
import { brightness, container, focusoutline, rect, solid } from '../../theming'

const StyledInput = styled('input')<
  Omit<CheckboxProps, 'size'> & { scale: 'sm' | 'md' | 'lg' | undefined }
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
          radiusIndex: 1,
          width: '1em'
        })}
        border-color: ${grayLight};
        content: '';
        display: block;
        transition: all 0.15s;
      }

      &:before {
        content: '✔';
        display: block;
        position: absolute;
        z-index: 9;
        line-height: 1.5em;
        font-size: 0.7em;
        text-align: center;
        width: 100%;
        height: 100%;
        transition: all 0.15s;
        color: #fff;
      }
    `
  }}

  ${({ accent, theme }) => {
    const bg = theme.background.darker[accent]
    return css`
      &:checked:after {
        ${solid(bg)}
      }
    `
  }}
`

export interface CheckboxProps {
  /**
   * Choose the color variation of the control.
   */
  accent: 'error' | 'primary' | 'secondary' | 'success' | 'warning'
  /**
   * Set the initial checked state of the checkbox.
   */
  checked?: boolean
  /**
   * Get notified whenever the checkbox's state is changed.
   */
  onToggle?: (isOn: boolean) => void
  /**
   * Choose from 3 standard control sizes calculated based on the
   * applied theme's base font size.
   */
  size?: 'sm' | 'md' | 'lg'
}

/**
 * Checkboxes inform users of their options and allow them to easily
 * opt in or pass on specific items.
 */
export const Checkbox = ({
  accent = 'primary',
  checked = false,
  onToggle,
  size = 'md'
}: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(!!checked)
  const onChange = useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(() => {
    const _isChecked = !isChecked
    setIsChecked(_isChecked)
    typeof onToggle === 'function' && onToggle(_isChecked)
  }, [isChecked])

  return (
    <StyledInput
      accent={accent}
      checked={isChecked}
      onChange={onChange}
      scale={size}
      type='checkbox'
    />
  )
}
