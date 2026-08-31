import { useState, useEffect } from 'react'
import { trackLeadModalOpen, trackLeadModalClose, trackLeadModalSubmit } from '../lib/analytics'

const SHEET_URL =
  'https://script.google.com/macros/s/AKfycbxbGp_saM49ZQDd9hhPS4_0WUO-L3mXRcAmRRftltfxnUzJqQOuSb_DdzuxyYFfxITDUw/exec'

const STORAGE_KEY = 'linbisa_lead_modal_seen'
const DELAY_MS = 10000

export default function LeadModal() {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY)) return
    } catch {
      // storage unavailable — still show the modal
    }

    const timer = setTimeout(() => {
      setOpen(true)
      trackLeadModalOpen()
    }, DELAY_MS)

    return () => clearTimeout(timer)
  }, [])

  const remember = () => {
    try {
      localStorage.setItem(STORAGE_KEY, '1')
    } catch {
      // ignore
    }
  }

  const close = () => {
    setOpen(false)
    remember()
    trackLeadModalClose()
  }

  // Lock body scroll and allow Escape to dismiss while open
  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (e) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    const [firstName, ...rest] = form.name.trim().split(/\s+/)

    try {
      await fetch(SHEET_URL, {
        method: 'POST',
        body: JSON.stringify({
          firstName,
          lastName: rest.join(' '),
          email: form.email,
          phone: form.phone,
          message: 'Requested latest listings (homepage popup)',
        }),
        mode: 'no-cors',
      })
    } catch {
      // no-cors returns opaque response, this is expected
    }

    setSubmitting(false)
    setSubmitted(true)
    remember()
    trackLeadModalSubmit()
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-charcoal/70 backdrop-blur-sm animate-fade-in"
      onClick={close}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-white rounded-lg p-8 shadow-2xl max-h-[90vh] overflow-y-auto animate-fade-in-up"
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-slate hover:text-charcoal hover:bg-gray-100 transition-colors"
        >
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>

        {submitted ? (
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <div className="w-14 h-14 bg-gold rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="font-display text-2xl text-charcoal">You&rsquo;re on the list!</h3>
            <p className="text-slate font-light">
              We&rsquo;ll send our latest listings straight to your inbox.
            </p>
          </div>
        ) : (
          <>
            <h3 id="lead-modal-title" className="font-display text-2xl md:text-3xl text-charcoal mb-3 pr-8">
              Get Our Latest Listings
            </h3>
            <p className="text-slate text-sm font-light leading-relaxed mb-6">
              Be the first to see new properties and development opportunities from LINBISA Prime. Fill in your details and we&rsquo;ll send them your way.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate mb-1.5">Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm text-charcoal placeholder:text-gray-400 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                />
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
                <label className="block text-xs font-medium text-slate mb-1.5">Phone (optional)</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm text-charcoal placeholder:text-gray-400 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-gold text-white font-medium text-sm rounded-md hover:bg-gold-light active:scale-[0.98] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? 'Sending...' : 'Send Me Listings'}
              </button>
              <p className="text-xs text-gray-400 text-center font-light">
                No spam — just listings. Unsubscribe anytime.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
