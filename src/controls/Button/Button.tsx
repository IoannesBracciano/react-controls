import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import pt from 'prop-types'
import React, { useCallback } from 'react'
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
  font-weight: bold;
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

const EnabledState = (accent: string) => css`
  ${brightness('107%', [':focus', ':hover'])}
  ${brightness('97%', [':active'])}
  &:active {
    ${ButtonLabel}, ${ButtonIcon} {
      transform: scale(0.98);
    }
  }
  &:focus {
    z-index: 9;
  }
  &:focus,
  &:hover {
    ${raise(2, accent)}
  }
  &:hover {
    cursor: pointer;
  }
`

const StyledButton = styled('button')<Omit<ButtonProps, 'children'>>`
  ${({ size }) => container({ spacing: 7, scale: size })}
  ${({ accent }) => surface({ accent })}
  ${focusoutline()}
  ${({ accent = 'primary', disabled, spinning }) =>
    !(disabled || spinning)
      ? EnabledState(accent)
      : disabled
      ? DisabledState
      : AsyncProgressState}
  ${({ accent, flat, theme }) =>
    flat &&
    css`
      background-color: ${ThemeResolver.getAccentBaseColor(
        accent || 'primary'
      )}00;
      color: ${rgb
        .parseHex(
          ThemeResolver.getAccentBaseColor(accent || 'primary')({ theme })
        )
        .toHsl()
        .darken(0.3)
        .toRgb()};
      font-weight: bold;
      &:not(:disabled):hover,
      &:focus {
        ${raise(0, 'neutral')}
        background-color: ${ThemeResolver.getAccentBaseColor(
          accent || 'primary'
        )}19;
      }
      &:not(:disabled):active {
        ${raise(0, 'neutral')}
        background-color: ${ThemeResolver.getAccentBaseColor(
          accent || 'primary'
        )}30;
      }
      ${brightness('100%', [':focus', ':hover'])}
      ${brightness('97%', [':active'])}
    `}
  transition: all 0.15s;

  /* Group of buttons */
  .flex {
    & ~ &:not(:last-child) {
      margin-left: 1px;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }

    & ~ &:last-child {
      margin-left: 1px;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }

    &:not(:last-child):first-child {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
`

export interface ButtonProps {
  /** The button's label. */
  children?: string
  /** Pass `true` to disable any interaction with the control. */
  disabled?: boolean
  flat?: boolean
  /** The id is passed down to the actual HTML `<button>` element. */
  id?: string
  /** A FontAwsome icon to show in front of the button's label */
  icon?: any
  /** Pass `true` to disable all interactions with the control and show
   * an animated spinner in front of the button's label. */
  spinning?: boolean
  /** Get notified whenever the button is pressed. */
  onPress?: React.MouseEventHandler<HTMLButtonElement>
  /** Choose from 3 standard control sizes calculated based on the
   * applied theme's base font size. */
  size?: 'sm' | 'md' | 'lg'
  /** Choose the color variation of the control. */
  accent?: 'error' | 'primary' | 'secondary' | 'success' | 'warning'
}

/**
 * Buttons enable users to perform actions with a push (click). They
 * come in various colors and sizes to choose depending on the use case.
 *
 * @example<caption>A simple use case.</caption>
 * // We want to run this logic when a button is pressed:
 * function throwDice() {
 *   const result = Math.round(Math.random() * 6);
 *   ...
 * }
 * // Get notified when the user presses the button and call `throwDice`
 * <Button onPress={throwDice}>Throw the Dice!</Button>
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
  onPress
}: ButtonProps & { className?: string }) => {
  const onHTMLButtonClick = useCallback(
    (evt: React.MouseEvent<HTMLButtonElement>) => {
      if (!spinning && onPress) {
        onPress(evt)
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
      onClick={onHTMLButtonClick}
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
  accent: pt.oneOf(['error', 'primary', 'secondary', 'success', 'warning']),
  children: pt.string,
  disabled: pt.bool,
  flat: pt.bool,
  id: pt.string,
  icon: pt.object,
  onClick: pt.func,
  size: pt.oneOf(['sm', 'md', 'lg']),
  spinning: pt.bool
}

Button.__Styled__ = StyledButton

export default Button
