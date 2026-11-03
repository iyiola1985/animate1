import { useEffect, useState } from 'react'

const NAV_LINKS = ['Worlds', 'Cast', 'Episodes', 'Shop'] as const

const linkClassName = 'transition-opacity hover:opacity-60'

function hrefFor(label: (typeof NAV_LINKS)[number]) {
  return `#${label.toLowerCase()}`
}

export default function Navbar() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-10 flex items-center justify-between gap-3 px-5 pt-[max(1rem,env(safe-area-inset-top))] pb-4 sm:px-8 sm:pb-5">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <span
            className="min-w-0 truncate text-[clamp(18px,3.2vw,28px)] font-normal text-white [font-family:var(--font-heading)]"
          >
            sholatech toons
          </span>
          <span
            aria-hidden="true"
            className="shrink-0 select-none text-[clamp(20px,3.6vw,32px)] text-white"
            style={{ letterSpacing: '-0.02em' }}
          >
            ✳︎
          </span>
        </div>

        <nav
          className="absolute left-1/2 hidden -translate-x-1/2 items-center text-[22px] text-white xl:flex"
          aria-label="Primary"
        >
          {NAV_LINKS.map((label, index) => (
            <span key={label}>
              {index > 0 ? ', ' : null}
              <a href={hrefFor(label)} className={linkClassName}>
                {label}
              </a>
            </span>
          ))}
        </nav>

        <a
          href="mailto:iyiolaolusolatech@gmail.com"
          className="hidden shrink-0 text-[22px] text-white underline underline-offset-2 transition-opacity hover:opacity-60 xl:inline"
        >
          Draw with us
        </a>

        <button
          type="button"
          className="flex shrink-0 flex-col gap-[5px] xl:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span
            className={`block h-[2px] w-6 origin-center bg-white transition-all duration-300 ${
              open ? 'translate-y-[7px] rotate-45' : ''
            }`}
          />
          <span
            className={`block h-[2px] w-6 bg-white transition-all duration-300 ${
              open ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block h-[2px] w-6 origin-center bg-white transition-all duration-300 ${
              open ? '-translate-y-[7px] -rotate-45' : ''
            }`}
          />
        </button>
      </header>

      <div
        id="mobile-nav"
        className={`fixed inset-0 z-[9] flex flex-col items-start justify-center gap-8 bg-black/90 px-8 pt-[max(5rem,env(safe-area-inset-top))] pb-[max(2rem,env(safe-area-inset-bottom))] backdrop-blur-md transition-opacity duration-300 xl:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        inert={!open}
        aria-hidden={!open}
      >
        {NAV_LINKS.map((label) => (
          <a
            key={label}
            href={hrefFor(label)}
            className="text-[32px] font-medium text-white transition-opacity hover:opacity-60"
            onClick={() => setOpen(false)}
          >
            {label}
          </a>
        ))}
        <a
          href="mailto:iyiolaolusolatech@gmail.com"
          className="text-[32px] font-medium text-white underline underline-offset-2 transition-opacity hover:opacity-60"
          onClick={() => setOpen(false)}
        >
          Draw with us
        </a>
      </div>
    </>
  )
}
