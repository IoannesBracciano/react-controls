import { RefObject, useEffect, useRef, useState } from 'react'

export const useMousePos = () => {
  const [pos, setPos] = useState<[number, number]>([0, 0])
  useEffect(() => {
    window.addEventListener('mousemove', (ev) => {
      setPos([ev.pageX, ev.pageY])
    })
  }, [])
  return pos
}

export function useRect<TRef extends HTMLElement = HTMLElement>(): [
  RefObject<TRef> | null,
  DOMRect
] {
  const ref = useRef<TRef>(null)
  const [rect, setRect] = useState<DOMRect>(new DOMRect(0, 0, 0, 0))
  useEffect(() => {
    if (ref.current) {
      setRect(ref.current.getBoundingClientRect())
    }
  }, [ref])
  return [ref, rect]
}
