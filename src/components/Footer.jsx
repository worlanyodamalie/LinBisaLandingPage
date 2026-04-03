export default function Footer() {
  return (
    <footer className="bg-[#172131] py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
        {/* Logo */}
        <img
          src="/images/logo.png"
          alt="Linbisa Prime LLC"
          className="h-32 md:h-40 w-auto mx-auto mb-10"
        />

        {/* Divider */}
        <div className="w-16 h-px bg-gold/30 mx-auto mb-6" />

        {/* Copyright */}
        <p className="text-muted text-xs">
          &copy; 2026 Linbisa Prime LLC. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
