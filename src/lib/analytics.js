// Lightweight wrapper around gtag for safe firing
export function trackEvent(action, params = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('event', action, params)
}

// Track navigation link clicks (Home, Services, Portfolio, About, Contact)
export function trackNavClick(label) {
  trackEvent('nav_click', {
    event_category: 'navigation',
    event_label: label,
  })
}

// Track when a section becomes visible in viewport
export function trackSectionView(section) {
  trackEvent('section_view', {
    event_category: 'engagement',
    event_label: section,
  })
}

// Track contact form submissions
export function trackFormSubmit() {
  trackEvent('form_submit', {
    event_category: 'engagement',
    event_label: 'contact_form',
  })
}

// Track the homepage lead-generation modal
export function trackLeadModalOpen() {
  trackEvent('lead_modal_open', {
    event_category: 'engagement',
    event_label: 'listings_modal',
  })
}

export function trackLeadModalClose() {
  trackEvent('lead_modal_close', {
    event_category: 'engagement',
    event_label: 'listings_modal',
  })
}

export function trackLeadModalSubmit() {
  trackEvent('form_submit', {
    event_category: 'engagement',
    event_label: 'listings_modal',
  })
}
