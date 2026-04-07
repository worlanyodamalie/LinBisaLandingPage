import { useState, useEffect, useRef } from 'react'

const GOOGLE_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLScQpzx1nq0S0BLFhIUHKaxAh1aFfHYA2VHnSCJcsL2XKFIagA/formResponse'

export default function Contact() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    const formData = new FormData()
    formData.append('entry.473318395', form.firstName)
    formData.append('entry.1647960025', form.lastName)
    formData.append('entry.1401163659', form.email)
    formData.append('entry.811945873', form.phone)
    formData.append('entry.1790300408', form.message)

    try {
      await fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        body: formData,
        mode: 'no-cors',
      })
    } catch {
      // Google Forms returns opaque response with no-cors, this is expected
    }

    setSubmitting(false)
    setSubmitted(true)
  }

  return (
    <section id="contact" className="bg-navy py-20 md:py-28">
      <div
        ref={ref}
        className="max-w-7xl mx-auto px-6 lg:px-12 opacity-0 translate-y-8 transition-all duration-1000 ease-out"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left — info */}
          <div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-white mb-6">
              Contact Us
            </h2>
            <p className="text-white font-semibold text-lg mb-3">
              Let&rsquo;s build something exceptional.
            </p>
            <p className="text-muted text-base leading-relaxed font-light mb-4">
              Whether you&rsquo;re planning a new construction project, a major renovation, or a development venture — we&rsquo;re ready to help bring your vision to life.
            </p>
            <p className="text-muted text-base font-light mb-8">
              Get in touch to start your project.
            </p>

            <div className="space-y-4 text-sm">
              <p className="text-muted">
                <span className="text-white font-medium">Email: </span>
                <a href="mailto:info@linbisaprime.com" className="hover:text-gold transition-colors">
                  info@linbisaprime.com
                </a>
              </p>
              <p className="text-muted">
                <span className="text-white font-medium">Phone: </span>
                <a href="tel:+12402322040" className="hover:text-gold transition-colors">
                  +1 (240) 232-2040
                </a>
              </p>
            </div>

            {/* Social icons */}
            <div className="flex gap-4 mt-8">
              <a
                href="https://www.instagram.com/linbisaprime/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-navy-light text-muted hover:text-gold transition-colors duration-300"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/linbisaprimellc"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-navy-light text-muted hover:text-gold transition-colors duration-300"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right — form */}
          <div className="bg-white rounded-lg p-8">
            {submitted ? (
              <div className="flex flex-col items-center gap-4 py-8 text-center">
                <div className="w-14 h-14 bg-gold rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-display text-2xl text-charcoal">Thank you!</h3>
                <p className="text-slate font-light">We&rsquo;ll be in touch within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate mb-1.5">First Name *</label>
                    <input
                      type="text"
                      value={form.firstName}
                      onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                      required
                      className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm text-charcoal placeholder:text-gray-400 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate mb-1.5">Last Name *</label>
                    <input
                      type="text"
                      value={form.lastName}
                      onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      required
                      className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm text-charcoal placeholder:text-gray-400 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate mb-1.5">Email *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm text-charcoal placeholder:text-gray-400 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate mb-1.5">Phone</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm text-charcoal placeholder:text-gray-400 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate mb-1.5">Message</label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm text-charcoal placeholder:text-gray-400 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 bg-gold text-white font-medium text-sm rounded-md hover:bg-gold-light active:scale-[0.98] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
