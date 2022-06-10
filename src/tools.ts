import { useEffect, useRef, useState } from 'react'

export function useMeasure<E extends HTMLElement | SVGElement>(...deps: any[]) {
  const ref = useRef<E>(null)
  const [height, setHeight] = useState<number>(0)
  const [width, setWidth] = useState<number>(0)

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      setHeight(rect.height)
      setWidth(rect.width)
    }
  }, [...deps])

  return [ref, height, width] as const
}
