import { useEffect, useRef, useCallback } from 'react'

const base = import.meta.env.BASE_URL

const images = [
  { label: 'Kitchen Remodel', src: `${base}images/kitchen-1.jpeg` },
  { label: 'Gourmet Kitchen', src: `${base}images/kitchen-2.jpeg` },
  { label: 'Living Room', src: `${base}images/living-1.jpeg` },
  { label: 'Master Bedroom', src: `${base}images/bedroom-1.jpeg` },
  { label: 'Modern Kitchen', src: `${base}images/kitchen-3.jpeg` },
  { label: 'Family Room', src: `${base}images/living-2.jpeg` },
  { label: 'Cozy Living', src: `${base}images/living-3.jpeg` },
  { label: 'Guest Bedroom', src: `${base}images/bedroom-2.jpeg` },
  { label: 'Basement Lounge', src: `${base}images/basement.jpeg` },
  { label: 'Dining Room', src: `${base}images/dining.jpeg` },
]

const items = [
  'New construction homes',
  'Luxury custom builds',
  'Full home renovations',
  'Additions and expansions',
  'Tear-down and rebuild projects',
  'Development projects',
]

export default function Portfolio() {
  const sectionRef = useRef(null)
  const scrollRef = useRef(null)

  const scroll = useCallback((direction) => {
    const el = scrollRef.current
    if (!el) return
    const amount = 400
    el.scrollBy({ left: direction * amount, behavior: 'smooth' })
  }, [])

  // Fade-in observer
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add('opacity-100', 'translate-y-0')
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="portfolio" className="bg-cream py-20 md:py-28 overflow-hidden">
      {/* Heading */}
      <div
        ref={sectionRef}
        className="max-w-7xl mx-auto px-6 lg:px-12 text-center mb-12 opacity-0 translate-y-8 transition-all duration-1000 ease-out"
      >
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-charcoal mb-3">
          Projects / Portfolio
        </h2>
        <p className="text-slate text-base md:text-lg font-light">
          Crafted spaces. Proven results.
        </p>
      </div>

      {/* Scrolling image strip */}
      <div className="relative mb-16">
        <div
          ref={scrollRef}
          className="flex overflow-x-hidden"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {[...images, ...images].map((img, i) => (
            <div
              key={i}
              className="relative flex-shrink-0 w-72 h-72 md:w-96 md:h-80 lg:w-[28rem] lg:h-96 overflow-hidden"
            >
              <img
                src={img.src}
                alt={img.label}
                className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
              <p className="absolute bottom-4 left-5 font-display text-white text-lg opacity-0 hover:opacity-100 transition-opacity duration-300 drop-shadow-lg">
                {img.label}
              </p>
            </div>
          ))}
        </div>

        {/* Arrows — vertically centered at left/right edges */}
        <button
          onClick={() => scroll(-1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-sm shadow-lg rounded-full flex items-center justify-center text-charcoal hover:bg-gold hover:text-white transition-all duration-300 z-10"
          aria-label="Scroll left"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          onClick={() => scroll(1)}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-sm shadow-lg rounded-full flex items-center justify-center text-charcoal hover:bg-gold hover:text-white transition-all duration-300 z-10"
          aria-label="Scroll right"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Description + items */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <p className="text-slate text-base md:text-lg text-center mb-8 font-light">
          We deliver a range of residential projects including:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto mb-10">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 bg-white rounded-lg px-5 py-4 shadow-sm"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-gold flex-shrink-0" />
              <span className="text-charcoal text-sm md:text-base">{item}</span>
            </div>
          ))}
        </div>

        <p className="text-center font-display italic text-gold text-base md:text-lg">
          Every project is built with a focus on design, quality, and lasting value.
        </p>
      </div>
    </section>
  )
}
