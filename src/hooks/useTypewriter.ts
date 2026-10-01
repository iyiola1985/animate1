import { useEffect, useState } from 'react'

export function useTypewriter(text: string, speed = 38, startDelay = 600) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    setDisplayed('')
    setDone(false)

    let index = 0
    let intervalId = 0

    const timeoutId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        index += 1
        setDisplayed(text.slice(0, index))
        if (index >= text.length) {
          window.clearInterval(intervalId)
          setDone(true)
        }
      }, speed)
    }, startDelay)

    return () => {
      window.clearTimeout(timeoutId)
      window.clearInterval(intervalId)
    }
  }, [text, speed, startDelay])

  return { displayed, done }
}
