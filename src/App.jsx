import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Intro from './components/Intro'
import ServicesBanner from './components/ServicesBanner'
import Portfolio from './components/Portfolio'
import Services from './components/Services'
import EcoSmart from './components/EcoSmart'
import Development from './components/Development'
import Investors from './components/Investors'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { trackSectionView } from './lib/analytics'

export default function App() {
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const seen = new Set()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !seen.has(entry.target.id)) {
            seen.add(entry.target.id)
            trackSectionView(entry.target.id)
          }
        })
      },
      { threshold: 0.4 }
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="bg-cream text-slate font-sans scroll-smooth">
      <Navbar />
      <main>
        <Hero />
        <Intro />
        <ServicesBanner />
        <Portfolio />
        <Services />
        <EcoSmart />
        <Development />
        <Investors />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
