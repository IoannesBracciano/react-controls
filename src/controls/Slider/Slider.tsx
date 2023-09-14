import React, { useCallback, useEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import { brightness, container, focusoutline, rect, solid } from '../../theming'

const SliderHandle = styled('div')<
  Omit<SliderProps, 'size'> & { scale: 'sm' | 'md' | 'lg' | undefined }
>`
  ${rect({
    height: '100%',
    radiusIndex: 3
  })}
  ${({ accent, theme }) => solid(theme.background.solid[accent])}

  left: 0;
  min-width: 1.1em;
  position: absolute;
  top: 0;
  transition: all 0.15s, width 0s;

  &:after {
    ${rect({
      height: '0.55em',
      radiusIndex: 3,
      width: '0.55em'
    })}
    ${solid('#ffffff')}
    border: 1px solid transparent;
    box-sizing: border-box;
    content: '';
    display: block;
    position: absolute;
    top: calc(1px + 0.225em);
    right: calc(1px + 0.225em);
    transition: all 0.15s;
    z-index: 9;
  }

  & > span {
    ${container({ spacing: 4 })}
    ${rect({
      height: 'auto',
      radiusIndex: 3,
      width: 'auto'
    })}

    color: ${({ accent, theme }) => theme.accent.palette[accent]['80']};
    cursor: default;
    display: inline-block;
    font-family: 'Lato', sans;
    font-size: 0.75em;
    font-weight: bold;
    margin-left: -2.35em;
    opacity: 0;
    position: absolute;
    top: 0;
    transition: all 0.15s, opacity 0.1s, left 0s;
    z-index: -9;
  }
`

const SliderTrack = styled('div')<
  Omit<SliderProps, 'size'> & {
    scale: 'sm' | 'md' | 'lg' | undefined
    position: number
  }
>`
  ${focusoutline()}

  ${({ scale }) =>
    container({
      spacing: 0,
      scale
    })}
  ${rect({
    height: '1.1em',
    radiusIndex: 3,
    width: '100%'
  })}
  ${({ accent, theme }) => {
    const solidBgLightGray = theme.background.solid.neutral
    const bg = theme.accent.base[accent]
    return css`
      background: ${solidBgLightGray};
    `
  }}
  ${brightness('103%', [':focus', ':hover'])}
  ${brightness('97%', [':active'])}

  margin-top: 2em;
  margin-bottom: 0.5em;
  transition: all 0.15s, background-size 0s;

  &:focus,
  &:hover {
    ${rect({
      height: '1.25em',
      radiusIndex: 3,
      width: '100%'
    })}
    margin-top: 1.95em;
  }

  &:focus ${SliderHandle}, &:hover ${SliderHandle} {
    min-width: 1.25em;
  }

  &:focus ${SliderHandle}:after, &:hover ${SliderHandle}:after {
    ${rect({
      height: '0.8em',
      radiusIndex: 3,
      width: '0.8em'
    })}
    box-shadow: 0 0 0.2em 0.1em #00000030;
    top: calc(1px + 0.165em);
    right: calc(1px + 0.165em);
  }

  &:hover ${SliderHandle} > span {
    opacity: 1;
    top: -1.5em;
  }

  &:focus ${SliderHandle} > span {
    color: ${({ accent, theme }) => theme.accent.palette[accent]['80']};
    font-size: 1em;
    opacity: 1;
    top: -1.6em;
    margin-left: -2.15em;
  }
`

const useLinearInterpolator = (from: number, to: number) => {
  return [
    useCallback(
      (v: number) => from + Math.min(1, Math.max(0, v)) * (to - from),
      [from, to]
    ),
    useCallback(
      (u: number) => (Math.min(to, Math.max(from, u)) - from) / (to - from),
      [from, to]
    )
  ]
}

export interface SliderProps {
  accent: 'error' | 'primary' | 'secondary' | 'success' | 'warning'
  onSlide?: (position: number, value: number) => void
  range?: number[]
  size?: 'sm' | 'md' | 'lg'
  step?: number | number[]
  style?: React.CSSProperties
}

export const Slider = ({
  accent,
  onSlide,
  range = [0, 1],
  size,
  step
}: SliderProps) => {
  const [position, setPosition] = useState(0)
  const [sliderTrackRect, setSliderTrackRect] = useState<DOMRect>(new DOMRect())
  const [sliderHandleRect, setSliderHandleRect] = useState<DOMRect>(
    new DOMRect()
  )
  const [_, exterpMouse] = useLinearInterpolator(
    sliderTrackRect.left + sliderHandleRect.width / 2,
    sliderTrackRect.right - sliderHandleRect.width / 2
  )
  const [interpHandleX] = useLinearInterpolator(
    sliderHandleRect.width,
    sliderTrackRect.width
  )
  const [interpValue, exterpValue] = useLinearInterpolator(range[0], range[1])
  const sliderTrackRef = useRef<HTMLDivElement>(null)
  const sliderHandleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (sliderTrackRef.current) {
      const rect = sliderTrackRef.current.getBoundingClientRect()
      setSliderTrackRect(rect)
    }
  }, [sliderTrackRef])

  useEffect(() => {
    if (sliderHandleRef.current) {
      const rect = sliderHandleRef.current.getBoundingClientRect()
      setSliderHandleRect(rect)
    }
  }, [sliderHandleRef])

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!sliderTrackRect) {
        return
      }
      e.preventDefault()
      e.stopPropagation()
      sliderTrackRef.current?.focus()
      slideTo(exterpMouse(e.clientX))

      window.addEventListener('mousemove', onMouseMove)
      window.addEventListener('mouseup', onMouseUp)
      return () => {
        window.removeEventListener('mousemove', onMouseMove)
        window.removeEventListener('mouseup', onMouseUp)
      }
    },
    [sliderTrackRect]
  )
  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!sliderTrackRect) {
        return
      }
      slideTo(exterpMouse(e.clientX))
    },
    [sliderTrackRect]
  )
  const onMouseUp = useCallback(() => {
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
  }, [sliderTrackRect])

  const slideTo = (pos: number) => {
    if (!sliderTrackRect) {
      return
    }
    const _position = Math.min(1.0, Math.max(0.0, pos))
    const value = interpValue(_position)
    if (typeof step === 'number') {
      // const width = range[1] - range[0]
      // const stepCount = width / step
      const distanceFromStep = value % step
      const adjustedValue =
        distanceFromStep < step / 2.0
          ? value - distanceFromStep
          : value + step - distanceFromStep
      const adjustedPosition = exterpValue(adjustedValue)
      if (adjustedPosition !== position) {
        setPosition(adjustedPosition)
        if (onSlide) {
          onSlide(adjustedPosition, adjustedValue)
        }
      }
    } else {
      setPosition(_position)
      if (onSlide) {
        onSlide(_position, value)
      }
    }
  }

  return (
    <SliderTrack
      accent={accent}
      onMouseDown={onMouseDown}
      position={position}
      ref={sliderTrackRef}
      scale={size}
      tabIndex={0}
    >
      <SliderHandle
        accent={accent}
        ref={sliderHandleRef}
        scale={size}
        style={{ width: interpHandleX(position) + 'px' }}
      >
        <span style={{ left: interpHandleX(position) + 'px' }}>
          {Number(interpValue(position)).toFixed(2)}
        </span>
      </SliderHandle>
    </SliderTrack>
  )
}

Slider.defaultProps = {
  accent: 'primary',
  range: [0, 1],
  size: 'md'
}
