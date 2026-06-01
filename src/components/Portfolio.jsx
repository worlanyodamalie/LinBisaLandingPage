import { useEffect, useRef, useCallback, useState } from 'react'

const base = import.meta.env.BASE_URL

const images = [
  { label: 'Conway Road — Front Elevation', src: `${base}images/portfolio/front-elevation-architectural.jpg` },
  { label: 'Conway Road — First Floor Plan', src: `${base}images/portfolio/first-floor-plan.PNG` },
  { label: 'Conway Road — Second Floor Plan', src: `${base}images/portfolio/second-floor.PNG` },
  { label: 'Conway Road — Basement Plan', src: `${base}images/portfolio/basement-floorplan.PNG` },
  { label: 'Gourmet Kitchen', src: `${base}images/portfolio/771FAB9D-FDBA-4B73-AC69-406F5037AB08.png` },
  { label: 'Living Room', src: `${base}images/portfolio/7AFAB94C-A805-49A0-B84E-42F10D573159.png` },
  { label: 'Master Bedroom', src: `${base}images/portfolio/0D3029A4-ABD1-4AC5-A19A-58A3A8FFA7B1.png` },
  { label: 'Basement Lounge', src: `${base}images/portfolio/42C26BF1-CA43-43AE-9C5F-7DF35310D781.png` },
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
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const scroll = useCallback((direction) => {
    const el = scrollRef.current
    if (!el) return
    const amount = 400
    el.scrollBy({ left: direction * amount, behavior: 'smooth' })
  }, [])

  const openLightbox = useCallback((index) => setLightboxIndex(index), [])
  const closeLightbox = useCallback(() => setLightboxIndex(null), [])
  const stepLightbox = useCallback((direction) => {
    setLightboxIndex((prev) =>
      prev === null ? prev : (prev + direction + images.length) % images.length
    )
  }, [])

  // Lightbox: keyboard controls + body scroll lock while open
  useEffect(() => {
    if (lightboxIndex === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') closeLightbox()
      else if (e.key === 'ArrowRight') stepLightbox(1)
      else if (e.key === 'ArrowLeft') stepLightbox(-1)
    }
    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [lightboxIndex, closeLightbox, stepLightbox])

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
            <button
              key={i}
              type="button"
              onClick={() => openLightbox(i % images.length)}
              className="group relative flex-shrink-0 w-72 h-72 md:w-96 md:h-80 lg:w-[28rem] lg:h-96 overflow-hidden cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              aria-label={`View ${img.label}`}
            >
              <img
                src={img.src}
                alt={img.label}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <p className="absolute bottom-4 left-5 font-display text-white text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg">
                {img.label}
              </p>
            </button>
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

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={images[lightboxIndex].label}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 md:top-6 md:right-6 w-11 h-11 flex items-center justify-center text-white/80 hover:text-white transition-colors duration-300 z-10"
            aria-label="Close"
          >
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); stepLightbox(-1) }}
            className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 bg-white/10 hover:bg-gold rounded-full flex items-center justify-center text-white transition-all duration-300 z-10"
            aria-label="Previous image"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Image + caption */}
          <figure
            className="max-w-6xl max-h-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[lightboxIndex].src}
              alt={images[lightboxIndex].label}
              className="max-w-full max-h-[80vh] object-contain shadow-2xl"
            />
            <figcaption className="mt-4 font-display text-white text-base md:text-lg text-center">
              {images[lightboxIndex].label}
              <span className="block text-white/50 text-sm font-sans mt-1">
                {lightboxIndex + 1} / {images.length}
              </span>
            </figcaption>
          </figure>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); stepLightbox(1) }}
            className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 bg-white/10 hover:bg-gold rounded-full flex items-center justify-center text-white transition-all duration-300 z-10"
            aria-label="Next image"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      )}
    </section>
  )
}
