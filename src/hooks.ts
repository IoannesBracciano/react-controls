import {
  MouseEventHandler,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import { light as theme } from './theme'

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

export function useSpotlight<TRef extends HTMLElement>() {
  const [ref, rect] = useRect<TRef>()
  // const [targetX, setTargetX] = useState(0)
  // const onMouseEnter = useCallback(() => {
  //   if (ref && ref.current) {
  //     ref.current.setAttribute(
  //       'style',
  //       `background: ${theme.gradients.spotlight(highlightColor)}, ${baseColor}`
  //     )
  //   }
  // }, [ref])
  const onMouseMove = useCallback(
    (ev: MouseEvent) => {
      // const mousePageX = ev.pageX
      const halfWidth = rect.width / 2
      // const mouseRelX = mousePageX - rect.left
      // const targetX = -halfWidth + mouseRelX
      const targetX = -halfWidth + ev.offsetX
      // setTargetX(-halfWidth + mouseRelX)
      ref &&
        ref.current &&
        ref.current.setAttribute(
          'style',
          `background-position: ${targetX}px 0;`
        )
    },
    [rect]
  )
  // const onMouseLeave = useCallback(() => {
  //   if (ref && ref.current) {
  //     ref.current.setAttribute('style', `background: ${baseColor}`)
  //   }
  // }, [ref])
  useEffect(() => {
    if (ref && ref.current) {
      const el = ref.current
      // el.addEventListener('mouseenter', onMouseEnter)
      // el.addEventListener('mouseleave', onMouseLeave)
      el.addEventListener('mousemove', onMouseMove)
      return () => {
        el.removeEventListener('mousemove', onMouseMove)
        // el.removeEventListener('mouseleave', onMouseLeave)
        // el.removeEventListener('mouseenter', onMouseEnter)
      }
    }
  }, [ref, rect])
  // useEffect(() => {
  //   if (ref && ref.current) {
  //     const el = ref.current
  //     el.setAttribute('style', `background-position: ${targetX}px 0;`)
  //   }
  // }, [targetX])
  return ref
}
