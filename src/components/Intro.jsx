import { useEffect, useRef } from 'react'

export default function Intro() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add('opacity-100', 'translate-y-0')
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="intro" className="bg-cream py-20 md:py-28">
      <div
        ref={ref}
        className="max-w-3xl mx-auto px-6 text-center opacity-0 translate-y-8 transition-all duration-1000 ease-out"
      >
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-charcoal leading-tight mb-8">
          Building homes that last in design, quality, and value.
        </h2>
        <p className="text-slate text-base md:text-lg leading-relaxed font-light">
          At Linbisa Prime, we deliver residential construction, renovation, and development projects from concept to completion. From luxury custom homes to full-scale renovations and land development, we manage every detail with precision.
        </p>
      </div>
    </section>
  )
}
