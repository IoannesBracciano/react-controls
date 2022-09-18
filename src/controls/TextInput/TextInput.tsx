import React, {
  ChangeEventHandler,
  CSSProperties,
  useCallback,
  useState
} from 'react'
import styled from 'styled-components'
import { RelativeContainer } from '../../shared/RelativeContainer'
import { focusoutline } from '../../theming'

const StyledLabel = styled('label')`
  color: #5c7374a0;
  font-family: Arial;
  font-size: 1em;
  left: 1.3em;
  position: absolute;
  top: 1.9em;
  transition: all 0.15s;
`

const StyledInput = styled('input')`
  ${focusoutline()}
  background-color: #f4f8f8;
  border: 1px solid transparent;
  border-radius: 0.3em;
  color: #000000cd;
  font-size: 12pt;
  margin: 1em 0;
  outline: 0.2em solid transparent;
  padding: 1.2em 1.3em 0.4em 1.3em;
  transition: all 0.15s;

  &:focus {
    background-color: #ffffff;
  }

  &:hover + ${StyledLabel} {
    color: #323a3ba9;
  }

  &:focus + ${StyledLabel}, &:not(.empty) + ${StyledLabel} {
    color: #5c7374;
    font-size: 0.7em;
    font-weight: bold;
    left: 1.9em;
    top: 1.9em;
  }
`

export interface TextInputProps {
  /**
   * When true, characters will be masked to protect sensitive text
   * such as passwords.
   */
  hide?: boolean
  /**
   * The id is passed down to the underlying HTML `<input>` element.
   */
  id?: string
  /**
   * The initial value of the tetx input.
   */
  initValue?: string
  /**
   * A short label disclosing what input is expected.
   */
  label: string
  /**
   * The name of the input field.
   */
  name?: string
  /**
   * Get notified whenever the input loses focus.
   */
  onBlur?: () => any
  /**
   * Get notified on each new user inout.
   */
  onChange?: (newValue: string) => any
  /**
   * Get notified whenever the input gains focus.
   */
  onFocus?: () => any
  placeholder?: string
  /**
   * Choose from 3 standard control sizes calculated based on the
   * applied theme's base font size.
   */
  size?: 'sm' | 'md' | 'lg'
  style?: CSSProperties
}

/**
 * Text inputs enable basic text inputing from the users.
 */
export const TextInput = ({
  hide,
  id,
  initValue,
  label,
  name,
  onBlur,
  onChange,
  onFocus,
  placeholder,
  style
}: TextInputProps) => {
  const [value, setValue] = useState(initValue)
  const _onChange = useCallback<ChangeEventHandler<HTMLInputElement>>((ev) => {
    typeof onChange === 'function' && onChange(ev.target.value)
    setValue(ev.target.value)
  }, [])

  return (
    <RelativeContainer className='text-input-container'>
      <StyledInput
        className={`${value && value.length ? '' : 'empty'}`}
        id={id}
        name={name}
        onBlur={onBlur}
        onChange={_onChange}
        onFocus={onFocus}
        placeholder={placeholder}
        type={hide ? 'password' : 'text'}
        value={value}
      />
      <StyledLabel htmlFor={name}>{label}</StyledLabel>
    </RelativeContainer>
  )
}

TextInput.defaultProps = {
  size: 'sm'
}
