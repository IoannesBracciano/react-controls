import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import pt from 'prop-types'
import React, { memo, useCallback } from 'react'
import styled, { css } from 'styled-components'
import {
  brightness,
  container,
  focusoutline,
  raise,
  surface,
  ThemeResolver
} from '../../theming'
import { rgb } from '../../theming/rgb'
import Spinner from '../Spinner'

const ButtonIcon = styled(FontAwesomeIcon)`
  display: inline-block;
  margin-left: -0.25em;
  margin-right: 0.75em;
  transform-origin: center;
  transition: all 0.15s;
  width: 0.8em;

  &:last-child {
    margin-left: -0.5em;
    margin-right: -0.5em;
  }
`

const ButtonLabel = styled('span')`
  display: inline-block;
  transform-origin: center;
  transition: all 0.15s;
`

const ButtonSpinner = styled(Spinner)`
  position: absolute;
  left: 0.35em;
  top: 0.3em;
  transition: all 0.2s;
`

const AsyncProgressState = css`
  cursor: progress;
  ${ButtonLabel} {
    opacity: 0.5;
    transform: scale(0.99);
  }
  ${ButtonSpinner} + ${ButtonLabel} {
    transform: translateX(0.6em) scale(0.99);
  }
  ${ButtonIcon} {
    opacity: 0;
    transform: scale(0.99);
  }
`

const DisabledState = css`
  filter: saturate(0.7);
  opacity: 0.7;
  ${ButtonLabel},
  ${ButtonIcon} {
    opacity: 0.5;
  }
`

const EnabledState = css`
  ${brightness('107%', [':focus', ':hover'])}
  ${brightness('97%', [':active'])}
  ${raise(1, [':focus', ':hover'])}
  ${raise(0, [':active'])}

  &:hover {
    cursor: pointer;
  }
  &:active {
    ${ButtonLabel}, ${ButtonIcon} {
      transform: scale(0.99);
    }
  }
`

const StyledButton = memo(styled('button')<Omit<ButtonProps, 'children'>>`
  ${({ size }) => container({ spacing: 7, scale: size })}
  ${({ accent }) => surface({ accent })}
  ${focusoutline()}
  ${({ disabled, spinning }) =>
    !(disabled || spinning)
      ? EnabledState
      : disabled
      ? DisabledState
      : AsyncProgressState}
  ${({ accent, flat, theme }) =>
    flat &&
    css`
      background-color: ${ThemeResolver.getAccentColor(accent || 'primary')}00;
      color: ${rgb
        .parseHex(ThemeResolver.getAccentColor(accent || 'primary')({ theme }))
        .toHsl()
        .darken(0.3)
        .toRgb()};
      font-weight: bold;
      &:not(:disabled):hover,
      &:focus {
        background-color: ${ThemeResolver.getAccentColor(
          accent || 'primary'
        )}19;
      }
      &:not(:disabled):active {
        background-color: ${ThemeResolver.getAccentColor(
          accent || 'primary'
        )}30;
      }
      ${brightness('100%', [':focus', ':hover'])}
      ${brightness('97%', [':active'])}
      ${raise(2, [':focus', ':hover', ':active'])}
    `}
  transition: all 0.15s;

  & + & {
    margin-right: 0.5em;
  }
`)

export interface ButtonProps {
  children?: string
  disabled?: boolean
  flat?: boolean
  id?: string
  icon?: any
  spinning?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  size?: 'sm' | 'md' | 'lg'
  accent?: 'error' | 'primary' | 'secondary' | 'success' | 'warning'
}

/**
 * Buttons enable users to perform actions with a push (click). They
 * come in various colors and sizes to choose depending on the use case.
 */
const Button = ({
  accent,
  children,
  disabled,
  flat,
  id,
  icon,
  size,
  spinning,
  onClick
}: ButtonProps & { className?: string }) => {
  const _onClick = useCallback(
    (evt: React.MouseEvent<HTMLButtonElement>) => {
      if (!spinning && onClick) {
        onClick(evt)
      }
    },
    [spinning]
  )

  return (
    <StyledButton
      accent={accent}
      disabled={!!disabled}
      flat={flat}
      id={id}
      onClick={_onClick}
      role='button'
      size={size}
      spinning={spinning}
    >
      {spinning && <ButtonSpinner size='1.5em' />}
      {icon && <ButtonIcon icon={icon} />}
      {children && <ButtonLabel>{children}</ButtonLabel>}
    </StyledButton>
  )
}

Button.defaultProps = {
  accent: 'primary',
  disabled: false,
  flat: false,
  size: 'md'
}

Button.propTypes = {
  accent: pt.oneOf(['error', 'primary', 'secondary', 'success', 'warining']),
  disabled: pt.bool,
  flat: pt.bool,
  id: pt.string,
  icon: pt.object,
  onClick: pt.func,
  size: pt.oneOf(['sm', 'md', 'lg']),
  spinning: pt.bool
}

export default Button
