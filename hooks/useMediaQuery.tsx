// https://fireship.io/snippets/use-media-query-hook/
import { useState, useEffect } from "react"

const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
}

type Breakpoints = "sm" | "md" | "lg" | "xl" | "2xl"

const useMediaQuery = (query: Breakpoints) => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(`(min-width: ${breakpoints[query]})`)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }
    const listener = () => setMatches(media.matches)
    window.addEventListener("resize", listener)
    return () => window.removeEventListener("resize", listener)
  }, [matches, query])

  return matches
}

export default useMediaQuery
