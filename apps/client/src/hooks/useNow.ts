import { useSyncExternalStore } from "react"

// A shared "clock" that ticks once per second. useSyncExternalStore is React's
// way to read a value that lives outside React (here: the system time) without
// calling Date.now() during render, which React rules treat as impure.

const subscribe = (onTick: () => void) => {
  const id = setInterval(onTick, 1000)
  return () => clearInterval(id)
}

// Rounded to whole seconds so React sees the same value until the next tick
const getSnapshot = () => Math.floor(Date.now() / 1000) * 1000

/** Current time in ms, updated every second. */
export function useNow() {
  return useSyncExternalStore(subscribe, getSnapshot)
}
