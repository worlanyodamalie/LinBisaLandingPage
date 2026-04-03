import { useEffect, useRef } from 'react'

const opportunities = [
  {
    title: 'New construction projects',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    title: 'Renovation & resale',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
  },
  {
    title: 'Land development',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    title: 'Joint ventures',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
]

export default function Investors() {
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
    <section className="bg-navy py-20 md:py-28">
      <div
        ref={ref}
        className="max-w-5xl mx-auto px-6 lg:px-12 opacity-0 translate-y-8 transition-all duration-1000 ease-out"
      >
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-white mb-4">
            Investors
          </h2>
          <p className="text-white font-semibold text-lg md:text-xl mb-3">
            Partner with us
          </p>
          <p className="text-muted text-base md:text-lg font-light max-w-2xl mx-auto mb-2">
            We collaborate with investors on high-value real estate projects.
          </p>

          <p className="text-white font-semibold text-base">
            Opportunities include:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto mb-10">
          {opportunities.map((o, i) => (
            <div
              key={i}
              className="bg-navy-light rounded-xl p-6 flex items-center gap-4 hover:bg-[#1a2840] transition-colors duration-300"
            >
              <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center text-white flex-shrink-0">
                {o.icon}
              </div>
              <p className="text-white text-sm md:text-base">{o.title}</p>
            </div>
          ))}
        </div>

        <p className="text-center font-display italic text-gold text-base md:text-lg">
          We focus on strong returns, clear strategies, and well-executed projects.
        </p>
      </div>
    </section>
  )
}
