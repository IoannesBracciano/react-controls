import {
  faArrowDown,
  faCaretDown,
  faCaretSquareDown,
  faRoadCircleExclamation
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, {
  ReactChildren,
  ReactElement,
  useCallback,
  useState
} from 'react'
import styled from 'styled-components'
import { RelativeContainer } from '../../shared/RelativeContainer'
import { raise, rect, solid } from '../../theming'
import { TextInput } from '../TextInput/TextInput'

export type Option = {
  label: string
  value: any
}

export interface OptionProps {
  _onClick?: (o: any) => void
  children?: string
  value: any
}

export const Option = ({ _onClick, children, value }: OptionProps) => {
  const onClick = useCallback(() => {
    if (_onClick) {
      const o = {
        label: children,
        value
      }
      _onClick(o)
    }
  }, [])
  return (
    <li className='dropdown-option' onClick={onClick}>
      {children}
    </li>
  )
}

const DropdownPopover = styled.div<{ dropped: boolean }>`
  ${solid('#fcffff')}
  ${raise(4)}
  ${rect({ height: 'auto', radiusIndex: 1, width: '100%' })}
  display: ${({ dropped }) => (dropped ? 'block' : 'none')};
  left: 0;
  overflow-y: scroll;
  padding: 0em 0 0em 0;
  position: absolute;
  top: 1em;

  ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 3px;
    margin: 1em 0;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.3);
  }
`

const DropdownList = styled('ul')`
  display: block;
  font-family: Arial, Helvetica, sans-serif;
  list-style: none;
  margin: 0;
  padding: 0;

  & > li {
    display: block;
    padding: 0.8em 1.3em;
    cursor: default;
  }

  & > li.dropdown-option:hover {
    background: #f4f8f8;
  }

  & > li.dropdown-label {
    color: #999;
    font-size: 10pt;
    font-weight: bold;
    padding: 1.3em 1.5em 0.5em 1.5em;
  }
`

const StyledButton = styled.button`
  background-color: #f4f8f8;
  border: 1px solid transparent;
  border-radius: 0.3em;
  color: #5c7374a0;
  font-family: Arial;
  font-size: 12pt;
  margin: 1em 0;
  outline: 0.2em solid transparent;
  padding: 0.8em 4.3em 0.8em 1.3em;
  position: relative;
  transition: all 0.15s;

  &:focus {
  }

  &:hover {
    cursor: pointer;
  }

  & > .dropdown-button-icon {
    position: absolute;
    right: 1.3em;
  }
`

export interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactElement<OptionProps> | Array<ReactElement<OptionProps>>
  height?: number
  label: string
  placeholder?: string
}

export const Dropdown = ({
  children,
  height = 3,
  label,
  placeholder,
  ...rest
}: DropdownProps) => {
  const [dropped, setDropped] = useState(false)
  const [selection, setSelection] = useState<Option | null>(null)

  const onInputBlur = useCallback(() => {
    setTimeout(() => {
      setDropped(false)
    }, 250)
  }, [])

  const onButtonClick = useCallback(() => {
    setDropped(!dropped)
  }, [dropped])

  const onOptionClick = useCallback((o: Option) => {
    setSelection(o)
  }, [])

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        ...child.props,
        _onClick: onOptionClick
      })
    }
    return child
  })

  return (
    <RelativeContainer {...rest}>
      <StyledButton onBlur={onInputBlur} onClick={onButtonClick}>
        <span className='dropdown-button-label'>
          {selection ? selection.label : label}
        </span>
        <span className='dropdown-button-icon'>
          <FontAwesomeIcon icon={faCaretDown} />
        </span>
      </StyledButton>
      <DropdownPopover
        dropped={dropped}
        style={{ height: `${height * 2.6 + 2.6}em` }}
      >
        <DropdownList>
          <li className='dropdown-label'>{label}</li>
          {childrenWithProps}
        </DropdownList>
      </DropdownPopover>
    </RelativeContainer>
  )
}

Dropdown.defaultProps = {
  height: 3
}
