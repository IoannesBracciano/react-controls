import { arrayOf, element, oneOfType } from 'prop-types'
import React from 'react'
import { memo } from 'react'
import styled from 'styled-components'
import { Button, ButtonProps } from '../../controls/Button'

const StyledContainer = styled.div`
  ${Button.__Styled__}:not(:first-child):not(:last-child) {
    margin-left: 1px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  ${Button.__Styled__}:not(:first-child):last-child {
    margin-left: 1px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  ${Button.__Styled__}:not(:last-child):first-child {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
`

const MemoizedStyledContainer = memo(StyledContainer)

export interface ButtonGroupProps {
  children?: React.ReactElement<ButtonProps> | React.ReactElement<ButtonProps>[]
}

export const ButtonGroup = ({ children }: ButtonGroupProps) => (
  <MemoizedStyledContainer>{children}</MemoizedStyledContainer>
)

ButtonGroup.propTypes = {
  children: oneOfType([element, arrayOf(element)])
}
