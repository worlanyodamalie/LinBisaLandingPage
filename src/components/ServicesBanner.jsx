export default function ServicesBanner() {
  return (
    <section className="relative">
      {/* Gold banner content — flat top */}
      <div className="bg-[#975700] pt-10 md:pt-14 pb-10 md:pb-14">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-white text-lg md:text-2xl lg:text-3xl font-bold tracking-wider uppercase leading-relaxed">
            New Construction &ndash; Renovations &ndash; Additions &ndash; Development
          </p>
        </div>
      </div>

      {/* Wavy bottom SVG — cream wave below gold */}
      <div className="relative bg-[#975700]">
        <svg
          className="block w-full h-16 md:h-24 lg:h-28"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,120 L0,60 Q360,0 720,60 Q1080,120 1440,60 L1440,120 Z"
            fill="#FDF8ED"
          />
        </svg>
      </div>
    </section>
  )
}
