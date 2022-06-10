import React, { useCallback, useState } from 'react'
import styled, { css } from 'styled-components'
import {
  brightness,
  container,
  focusoutline,
  raise,
  rect,
  solid,
  ThemeResolver
} from '../../theming'

const StyledInput = styled('input')<
  Omit<CheckboxProps, 'size'> & { scale: 'sm' | 'md' | 'lg' | undefined }
>`
  ${({ scale }) =>
    container({
      spacing: 0,
      scale
    })}
  ${focusoutline(':after')}
  ${brightness('107%', [':focus', ':hover'])}
  ${brightness('97%', [':active'])}
  ${raise(3, [':focus:after', ':hover:after'])}
  -webkit-tap-highlight-color: transparent;
  appearance: none;
  cursor: pointer;
  font-family: 'Lato', sans-serif;
  transition: all 0.15s;
  ${({ accent }) => css`
    &:after {
      ${solid('#fafafa')}
      ${rect({
        height: '1em',
        radiusIndex: 2,
        width: '1em'
      })}
      border-color: ${ThemeResolver.getAccentColor(accent)}80;
      content: '';
      display: block;
      transition: all 0.15s;
    }

    &:before {
      ${rect({
        height: '1em',
        radiusIndex: 2,
        width: '1em'
      })}
      content: '✔';
      display: block;
      opacity: 0;
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
  `}

  &:checked:after {
    ${({ accent }) => solid(accent)};
    border-color: transparent;
  }

  &:focus::before,
  &:hover:before {
    box-shadow: 0 0 0.2em 0 #00000020;
  }

  ${({ accent }) => css`
    &:checked:before {
      opacity: 1;
      color: ${ThemeResolver.getInkForAccentedSurface(accent)};
    }
  `}
`

export interface CheckboxProps {
  accent: 'error' | 'primary' | 'secondary' | 'success' | 'warning'
  checked?: boolean
  onToggle?: (isOn: boolean) => void
  size?: 'sm' | 'md' | 'lg'
}

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
