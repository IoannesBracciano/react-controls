import React, { useMemo } from 'react'
import styled, * as Styled from 'styled-components'
import { useMeasure } from '../../tools'

const { keyframes } = Styled

const Spin = (size: number) => keyframes`
  0% {
      stroke-dashoffset: ${0.66 * size};
      transform: rotate(0deg);
  } 50% {
      stroke-dashoffset: ${3.14 * size};
      transform: rotate(540deg);
  } 100% {
      stroke-dashoffset: ${0.66 * size};
      transform: rotate(1080deg);
  }
`

const SpinningCircle = styled.circle<{ diameter: number }>`
  transform-origin: ${({ r = 0 }) => `${+r + 5}px ${+r + 5}px 0`};
  animation: ${({ diameter }) => Spin(diameter)} 3.5s linear infinite;
`

export interface SpinnerProps {
  className?: string
  color?: string
  size?: number | string
}

export const Spinner = ({ className, color, size }: SpinnerProps) => {
  const [ref, diameter] = useMeasure<SVGSVGElement>(size)
  const r = useMemo(() => diameter && diameter / 2 - 5, [diameter])
  const strokeDasharray = useMemo(() => Math.PI * diameter, [diameter])
  return (
    <div className={className}>
      <svg height={size} width={size} stroke={color} ref={ref}>
        <SpinningCircle
          cx='50%'
          cy='50%'
          diameter={diameter}
          fill='transparent'
          r={r}
          strokeDasharray={strokeDasharray}
          strokeLinecap='round'
          strokeWidth='0.15em'
        />
      </svg>
    </div>
  )
}

Spinner.defaultProps = {
  color: 'currentColor',
  size: 32
}
