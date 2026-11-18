import { useRef, type MouseEvent, type PointerEvent } from "react"

// Lets mouse users click-and-drag a horizontal scroller (touch devices already
// swipe natively). Returns props to spread on the scrolling element.
// Clicks still work: a click is only cancelled if the pointer actually moved.
export function useDragScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const state = useRef({ down: false, startX: 0, startScroll: 0, moved: false })

  const onPointerDown = (e: PointerEvent<T>) => {
    if (e.pointerType !== "mouse" || !ref.current) return
    state.current = {
      down: true,
      startX: e.clientX,
      startScroll: ref.current.scrollLeft,
      moved: false,
    }
  }

  const onPointerMove = (e: PointerEvent<T>) => {
    const s = state.current
    if (!s.down || !ref.current) return
    const dx = e.clientX - s.startX
    if (Math.abs(dx) > 5) {
      s.moved = true
      // Disable snapping while dragging so it doesn't fight the mouse
      ref.current.style.scrollSnapType = "none"
    }
    ref.current.scrollLeft = s.startScroll - dx
  }

  const end = () => {
    if (!state.current.down || !ref.current) return
    state.current.down = false
    ref.current.style.scrollSnapType = "" // snap back to the nearest card
  }

  // Swallow the click that ends a drag, so dragging over a button doesn't press it
  const onClickCapture = (e: MouseEvent<T>) => {
    if (state.current.moved) {
      e.preventDefault()
      e.stopPropagation()
      state.current.moved = false
    }
  }

  return {
    ref,
    onPointerDown,
    onPointerMove,
    onPointerUp: end,
    onPointerLeave: end,
    onClickCapture,
  }
}
