import { useState } from "react"
import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"

const STORAGE_KEY = "kataticket-theme"

// index.html already applied the saved theme before React loaded,
// so we read the current state straight from the <html> element.
const isDarkNow = () => document.documentElement.classList.contains("dark")

export function ThemeToggle() {
  const [dark, setDark] = useState(isDarkNow)

  const toggle = () => {
    const next = !dark
    document.documentElement.classList.toggle("dark", next)
    localStorage.setItem(STORAGE_KEY, next ? "dark" : "light")
    setDark(next)
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {dark ? <Sun /> : <Moon />}
    </Button>
  )
}
