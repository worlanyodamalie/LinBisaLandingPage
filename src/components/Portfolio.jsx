import { useState, useEffect, useRef, useCallback } from 'react'

const images = [
  { label: 'Kitchen Remodel', src: '/images/kitchen-1.jpeg' },
  { label: 'Gourmet Kitchen', src: '/images/kitchen-2.jpeg' },
  { label: 'Living Room', src: '/images/living-1.jpeg' },
  { label: 'Master Bedroom', src: '/images/bedroom-1.jpeg' },
  { label: 'Modern Kitchen', src: '/images/kitchen-3.jpeg' },
  { label: 'Family Room', src: '/images/living-2.jpeg' },
  { label: 'Cozy Living', src: '/images/living-3.jpeg' },
  { label: 'Guest Bedroom', src: '/images/bedroom-2.jpeg' },
  { label: 'Basement Lounge', src: '/images/basement.jpeg' },
  { label: 'Dining Room', src: '/images/dining.jpeg' },
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
  const [current, setCurrent] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [slidesPerView, setSlidesPerView] = useState(3)
  const sectionRef = useRef(null)

  const totalSlides = images.length
  const maxIndex = Math.max(0, totalSlides - slidesPerView)

  useEffect(() => {
    const updateSlidesPerView = () => {
      setSlidesPerView(window.innerWidth >= 768 ? 3 : 1)
    }
    updateSlidesPerView()
    window.addEventListener('resize', updateSlidesPerView)
    return () => window.removeEventListener('resize', updateSlidesPerView)
  }, [])

  const next = useCallback(() => {
    setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }, [maxIndex])

  const prev = useCallback(() => {
    setCurrent((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }, [maxIndex])

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(next, 3500)
    return () => clearInterval(interval)
  }, [isAutoPlaying, next])

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
    <section id="portfolio" className="bg-cream py-20 md:py-28">
      <div
        ref={sectionRef}
        className="max-w-7xl mx-auto px-6 lg:px-12 opacity-0 translate-y-8 transition-all duration-1000 ease-out"
      >
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-charcoal mb-3">
            Projects / Portfolio
          </h2>
          <p className="text-slate text-base md:text-lg font-light">
            Crafted spaces. Proven results.
          </p>
        </div>

        {/* Carousel */}
        <div
          className="relative mb-12"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="overflow-hidden rounded-lg">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${current * (100 / slidesPerView)}%)`,
              }}
            >
              {images.map((img, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 px-2"
                  style={{ width: `${100 / slidesPerView}%` }}
                >
                  <div className="relative h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden group cursor-pointer">
                    <img
                      src={img.src}
                      alt={img.label}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                      <p className="font-display text-white text-lg md:text-xl">{img.label}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Nav arrows */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 md:-translate-x-5 w-10 h-10 md:w-12 md:h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-charcoal hover:bg-gold hover:text-white transition-all duration-300 z-10"
            aria-label="Previous slide"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 md:translate-x-5 w-10 h-10 md:w-12 md:h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-charcoal hover:bg-gold hover:text-white transition-all duration-300 z-10"
            aria-label="Next slide"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === current ? 'bg-gold w-8' : 'bg-gray-300 hover:bg-gray-400 w-2.5'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Description */}
        <p className="text-slate text-base md:text-lg text-center mb-8 font-light">
          We deliver a range of residential projects including:
        </p>

        {/* Items grid */}
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

        {/* Italic quote */}
        <p className="text-center font-display italic text-gold text-base md:text-lg">
          Every project is built with a focus on design, quality, and lasting value.
        </p>
      </div>
    </section>
  )
}
