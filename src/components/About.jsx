import { useEffect, useRef } from 'react'

export default function About() {
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
    <section id="about" className="bg-cream py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-charcoal">
            About Linbisa Prime LLC
          </h2>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center opacity-0 translate-y-8 transition-all duration-1000 ease-out"
        >
          {/* Photo */}
          <div className="relative">
            <img
              src="/images/hero.jpeg"
              alt="Linbisa Prime LLC project"
              className="aspect-[4/3] rounded-xl object-cover w-full"
            />
          </div>

          {/* Text */}
          <div>
            <p className="text-slate text-base md:text-lg leading-relaxed mb-6 font-light">
              Linbisa Prime LLC is a licensed construction, renovation, and real estate development company focused on building and transforming high-quality residential properties.
            </p>
            <p className="text-slate text-base md:text-lg leading-relaxed mb-8 font-light">
              We work closely with architects, engineers, and project teams to deliver seamless execution, from planning to completion.
            </p>

            {/* Pull quote */}
            <blockquote className="border-l-4 border-gold pl-6">
              <p className="font-display text-lg md:text-xl text-charcoal italic leading-relaxed">
                &ldquo;We believe building is more than construction; it&rsquo;s about creating homes, improving communities, and delivering lasting value.&rdquo;
              </p>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  )
}
