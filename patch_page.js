import fs from 'fs';

const filePath = 'src/app/page.js';
let content = fs.readFileSync(filePath, 'utf8');

const targetHeroStart = `      {/* Hero Section */}`;
const targetHeroEnd = `      <FeatureHighlights />`;

const startIndex = content.indexOf(targetHeroStart);
const endIndex = content.indexOf(targetHeroEnd);

if (startIndex !== -1 && endIndex !== -1) {
  const newHero = `      {/* Hero Section */}
      <section className="relative w-full min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center pt-20 pb-10">
        <video
          src="/images/atv-video.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />

        {/* Text content */}
        <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center px-4 sm:px-8 mt-10">
          
          {/* Top Label */}
          <span className="block text-white/90 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] mb-4 sm:mb-6 drop-shadow-md">
            Operated By Roatan Eco-Adventures
          </span>

          {/* Main Title */}
          <StaggeredTextReveal
            el="h1"
            className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 sm:mb-6 drop-shadow-lg leading-tight"
            text="Roatan's Most Fun Eco-Adventure on Wheels"
          />

          {/* Sub-headline */}
          <p className="text-white/90 text-base sm:text-lg md:text-xl font-medium max-w-3xl mb-8 sm:mb-10 drop-shadow-md leading-relaxed">
            Ride ATVs, buggies and golf carts through Roatan's jungle trails and ocean-view roads with small groups, local guides and flexible tour times.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-8 sm:mb-10 w-full sm:w-auto">
            <a
              href="/plan"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 sm:py-4 rounded-full text-sm sm:text-base font-bold text-white bg-[#00694B] hover:bg-[#005a3c] shadow-[0_0_20px_rgba(0,105,75,0.4)] hover:shadow-[0_0_25px_rgba(0,105,75,0.6)] transition-all duration-300 hover:scale-[1.02]"
            >
              <span className="text-xl">🧭</span> Build Your Adventure
            </a>
            <a
              href="/tours"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 sm:py-4 rounded-full text-sm sm:text-base font-bold text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/40 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              View All Tours
            </a>
          </div>

          {/* Supporting Bullets */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 sm:gap-6 text-white/90 text-sm sm:text-base font-semibold drop-shadow-md pb-8">
            <div className="flex items-center gap-2"><span className="text-[#00694B] bg-white/90 rounded-full w-5 h-5 flex items-center justify-center shrink-0">✓</span> Free cruise-ship pickup</div>
            <span className="hidden md:block text-white/40">•</span>
            <div className="flex items-center gap-2"><span className="text-[#00694B] bg-white/90 rounded-full w-5 h-5 flex items-center justify-center shrink-0">✓</span> ATV, buggy and golf cart options</div>
            <span className="hidden md:block text-white/40">•</span>
            <div className="flex items-center gap-2"><span className="text-[#00694B] bg-white/90 rounded-full w-5 h-5 flex items-center justify-center shrink-0">✓</span> Photo-ready jungle &amp; beach stops</div>
          </div>
          
          {/* 3-Step Build Your Adventure Strip (above fold) */}
          <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 sm:mt-8 relative z-20">
             <Link href="/plan" className="group flex flex-col items-center p-5 rounded-2xl bg-white/15 hover:bg-white/25 border border-white/20 backdrop-blur-md transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">🏍️</div>
                <h3 className="text-white font-bold text-lg mb-1">1. Choose your ride</h3>
                <p className="text-white/80 text-sm">ATV · Buggy · Golf Cart</p>
             </Link>
             <Link href="/plan" className="group flex flex-col items-center p-5 rounded-2xl bg-white/15 hover:bg-white/25 border border-white/20 backdrop-blur-md transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">🗺️</div>
                <h3 className="text-white font-bold text-lg mb-1">2. Pick your route</h3>
                <p className="text-white/80 text-sm">Jungle · Beach · Combo</p>
             </Link>
             <Link href="/plan" className="group flex flex-col items-center p-5 rounded-2xl bg-white/15 hover:bg-white/25 border border-white/20 backdrop-blur-md transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">🕐</div>
                <h3 className="text-white font-bold text-lg mb-1">3. Select time &amp; ship</h3>
                <p className="text-white/80 text-sm">Morning · Midday · Afternoon</p>
             </Link>
          </div>

        </div>
      </section>
`;
  
  const modifiedContent = content.substring(0, startIndex) + newHero + content.substring(endIndex);
  fs.writeFileSync(filePath, modifiedContent, 'utf8');
  console.log("Successfully patched page.js");
} else {
  console.log("Could not find targets in page.js", startIndex, endIndex);
}
