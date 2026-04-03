import { useEffect, useRef } from 'react'

export default function Hero() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
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
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <img
        src="/images/hero.jpeg"
        alt="Luxury home exterior"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div
        ref={ref}
        className="relative z-10 text-center px-6 max-w-3xl mx-auto opacity-0 translate-y-8 transition-all duration-1000 ease-out"
      >
        <p className="font-display italic text-gold text-sm md:text-base mb-4">
          EcoSmart Luxury Builder
        </p>
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-white leading-[1.1] mb-6 font-bold">
          Build smart.<br />Live better.
        </h1>
        <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-sans font-light">
          We design, build, and transform high-quality homes with a focus on modern design, energy efficiency, and long-term value.
        </p>
      </div>
    </section>
  )
}
