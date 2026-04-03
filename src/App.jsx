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

export default function App() {
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
