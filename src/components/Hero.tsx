import { useEffect, useState } from 'react'
import { useTypewriter } from '../hooks/useTypewriter.ts'

const TYPEWRITER_TEXT =
  'Loud color, jumpy characters, and a story you can click through. Which toon should we draw?'

const ACTIONS = [
  'Sketch a toon',
  'Meet the cast',
  'Send a doodle',
  'See it move',
] as const

const SITE = 'sholatech.com'
const SITE_URL = 'https://sholatech.com'

const pillClassName =
  'mx-[0.2em] mb-[0.4em] inline-flex items-center justify-center whitespace-nowrap rounded-full px-4 py-[0.35em] text-[14px] transition-colors duration-200 sm:px-5 sm:text-[16px]'

export default function Hero() {
  const { displayed, done } = useTypewriter(TYPEWRITER_TEXT)
  const [pillsVisible, setPillsVisible] = useState(false)

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setPillsVisible(true), 400)
    return () => window.clearTimeout(timeoutId)
  }, [])

  return (
    <section className="hero-section relative z-[1] flex min-h-dvh flex-col justify-end overflow-x-hidden px-5 pt-[max(6rem,calc(env(safe-area-inset-top)+4.5rem))] pb-[max(3rem,env(safe-area-inset-bottom))] sm:px-8 md:px-10">
      <div className="relative z-10 max-w-2xl">
        <p
          className="pointer-events-none mb-3 select-none text-white [font-family:var(--font-heading)] sm:mb-4"
          style={{
            fontSize: 'clamp(28px, 4vw, 44px)',
            lineHeight: 1.05,
            fontWeight: 400,
          }}
        >
          A cartoon site,
          <br />
          drawn extra large.
        </p>

        <p
          className="mb-4 max-w-xl text-white sm:mb-5"
          style={{
            fontSize: 'clamp(16px, 2vw, 22px)',
            lineHeight: 1.3,
            fontWeight: 400,
            minHeight: '2.6em',
          }}
          aria-label={TYPEWRITER_TEXT}
        >
          <span aria-hidden="true">
            {displayed}
            {!done ? (
              <span className="typewriter-cursor ml-[2px] inline-block h-[1.1em] w-[2px] bg-white align-middle" />
            ) : null}
          </span>
        </p>

        <div
          className={`flex flex-wrap gap-y-1 ${pillsVisible ? '' : 'pointer-events-none'}`}
          style={{
            opacity: pillsVisible ? 1 : 0,
            transform: pillsVisible ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.4s ease, transform 0.4s ease',
          }}
        >
          {ACTIONS.map((label) => (
            <button
              key={label}
              type="button"
              className={`${pillClassName} border border-black/10 bg-white font-normal text-black [font-family:var(--font-heading)] hover:bg-black hover:text-white`}
            >
              {label}
            </button>
          ))}
          <a
            href={SITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`${pillClassName} border border-white bg-transparent font-normal text-white [font-family:var(--font-heading)] hover:bg-white hover:text-black`}
          >
            Pop in:{' '}
            <span className="underline underline-offset-1">{SITE}</span>
          </a>
        </div>
      </div>
    </section>
  )
}
