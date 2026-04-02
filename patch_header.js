import fs from 'fs';

const filePath = 'src/components/Header.js';
let content = fs.readFileSync(filePath, 'utf8');

const targetNavLinks = `const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'All Tours', href: '/tours' },
  { label: 'Categories', href: '/category' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Gift Cards', href: '/gift-cards' },
  { label: 'Build Your Adventure', href: '/plan', highlight: true },
  { label: 'About Us', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Reviews', href: 'https://maps.app.goo.gl/aZUsRT1JTetqxSrg7' },
];`;

const replacementNavLinks = `const navLinksLeft = [
  { label: 'Home', href: '/' },
  { label: 'All Tours', href: '/tours' },
  { label: 'Categories', href: '/category' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Gift Cards', href: '/gift-cards' },
];

const navLinksRight = [
  { label: 'About Us', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Reviews', href: 'https://maps.app.goo.gl/aZUsRT1JTetqxSrg7' },
];

const navLinks = [...navLinksLeft, ...navLinksRight];`;

content = content.replace(targetNavLinks, replacementNavLinks);

const targetReturn = `  return (
    <>
      <header className="w-full border-b border-gray-200 bg-white sticky top-0 z-50">`;

const targetDrawer = `      {/* ── Mobile Drawer ── */}`;

const startIndex = content.indexOf(targetReturn);
const endIndex = content.indexOf(targetDrawer);

if (startIndex !== -1 && endIndex !== -1) {
  const newReturn = `  return (
    <>
      <header className="w-full border-b border-gray-200 bg-white sticky top-0 z-[60]">
        {/* ── Top Bar (Utility) ── */}
        <div className="max-w-7xl mx-auto px-4 h-20 sm:h-[72px] flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Logo + Text Stack */}
          <div className="shrink-0 flex items-center">
            <a href="/" className="flex items-center gap-2 sm:gap-3">
              <Image
                src="/images/roatan-Eco-Adventures-logo .webp"
                alt="Roatan Eco-Adventures"
                width={50}
                height={50}
                className="object-contain w-10 h-10 sm:w-[50px] sm:h-[50px]"
              />
              <div className="flex flex-col">
                <span className="text-[#00694B] font-bold text-sm sm:text-[18px] leading-tight">Roatan Eco-Adventures</span>
                <span className="text-gray-500 text-[9px] sm:text-xs leading-tight">Roatan ATV, Buggy &amp; Golf Car Adventure</span>
              </div>
            </a>
          </div>

          {/* Right: Phone + Hours + CTA (Desktop) / CTA + Phone (Mobile) */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Phone + Hours (Desktop Only) */}
            <div className="hidden md:flex flex-col items-end mr-2">
              <a href="tel:+50412345678" className="text-[#00694B] font-bold text-lg hover:text-[#004d36] transition-colors flex items-center gap-1.5">
                <Phone size={18} fill="currentColor" /> +504 1234-5678
              </a>
              <span className="text-gray-500 text-xs font-medium">Open Daily · 7 AM – 6 PM</span>
            </div>

            {/* Mobile Phone Tap to Call */}
            <a href="tel:+50412345678" className="md:hidden text-[#00694B] hover:text-[#004d36] transition-colors p-1" aria-label="Call us">
              <Phone size={20} fill="currentColor" />
            </a>

            {/* Build Your Adventure CTA */}
            <motion.a
                href="/plan"
                animate={{
                  borderColor: ['rgba(0, 105, 75, 1)', 'rgba(0, 105, 75, 0.2)', 'rgba(0, 105, 75, 1)'],
                  boxShadow: ['0 0 8px 2px rgba(0, 105, 75, 0.6)', '0 0 2px 1px rgba(0, 105, 75, 0.1)', '0 0 8px 2px rgba(0, 105, 75, 0.6)'],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="text-xs sm:text-sm font-bold border-2 text-[#00694B] px-3 py-1.5 sm:px-4 sm:py-2 rounded-full flex items-center gap-1 sm:gap-2 whitespace-nowrap cursor-pointer hover:bg-gray-50 transition-colors"
                style={{ backgroundColor: 'white' }}
              >
                �� <span className="hidden sm:inline">Build Your Adventure</span>
                <span className="sm:hidden">Build</span>
            </motion.a>

            {/* Hamburger – mobile only */}
            <button
              className="md:hidden text-gray-700 hover:text-[#00694B] transition-colors p-1 ml-1"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* ── Bottom Bar (Nav Strip) - Desktop Only ── */}
        <div className="hidden md:block bg-[#00694B] text-white overflow-visible">
          <div className="max-w-7xl mx-auto px-4 h-12 flex items-center justify-between">
            {/* Left Links */}
            <nav className="flex items-center gap-6">
              {navLinksLeft.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href + '/'));
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className={\`text-sm font-semibold tracking-wide transition-colors \${isActive ? 'text-white border-b-2 border-white pb-0.5' : 'text-white/80 hover:text-white'}\`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>

            {/* Right Links + Search */}
            <div className="flex items-center gap-6">
               {/* Right Nav Links */}
               <nav className="flex items-center gap-6">
                {navLinksRight.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-sm font-semibold tracking-wide transition-colors text-white/80 hover:text-white"
                    >
                      {link.label}
                    </a>
                  ))}
               </nav>
               
               {/* Search - Using the existing search logic */}
               <div ref={searchRef} className="relative flex items-center pl-2 border-l border-white/20">
                  <div className={\`relative flex items-center transition-all duration-300 \${searchOpen ? 'w-64' : 'w-5'}\`}>
                    <button
                      onClick={() => setSearchOpen(true)}
                      className="text-white hover:text-white/80 transition-colors relative z-10"
                      aria-label="Toggle search"
                    >
                      <Search size={18} />
                    </button>

                    <input
                      ref={inputRef}
                      type="text"
                      placeholder="Search tours..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Escape') setSearchOpen(false); }}
                      className={\`absolute right-0 top-1/2 -translate-y-1/2 h-8 pl-8 pr-8 rounded-full border-none bg-white placeholder:text-gray-500 text-gray-800 focus:outline-none shadow-xl text-sm transition-all duration-300 ease-in-out \${
                        searchOpen ? 'w-64 opacity-100 pointer-events-auto' : 'w-0 opacity-0 pointer-events-none'
                      }\`}
                    />

                    {searchOpen && (
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setSearchOpen(false);
                          setSearchResults([]);
                        }}
                        className={\`absolute right-2 top-1/2 -translate-y-1/2 z-20 \${searchQuery ? 'text-gray-500 hover:text-gray-800' : 'text-gray-400 hover:text-gray-600'}\`}
                        aria-label="Close search"
                      >
                        <X size={14} />
                      </button>
                    )}

                    {/* Search Results */}
                    {searchOpen && (
                      <div className="absolute top-10 right-0 w-80 bg-white rounded-md shadow-2xl border border-gray-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200 text-left">
                        <div className="max-h-96 overflow-y-auto">
                          {(searchQuery ? searchResults : tours).length > 0 ? (
                            (searchQuery ? searchResults : tours).map((tour) => (
                              <a
                                key={tour._id}
                                href={\`/product/\${tour.slug}\`}
                                className="flex items-center gap-3 p-3 hover:bg-gray-50 border-b border-gray-100 last:border-0 transition-colors"
                                onClick={() => setSearchOpen(false)}
                              >
                                <div className="relative w-12 h-12 shrink-0 rounded-md overflow-hidden bg-gray-100">
                                  <Image
                                    src={tour.image_url || '/images/placeholder.jpg'}
                                    alt={tour.title}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div className="flex-1">
                                  <h4 className="text-sm font-semibold text-gray-800 line-clamp-1">{tour.title}</h4>
                                  <p className="text-xs text-[#00694B] font-medium">View Tour</p>
                                </div>
                              </a>
                            ))
                          ) : (
                            <div className="p-4 text-center text-gray-500 text-sm">
                              {searchQuery ? \`No tours found matching "\${searchQuery}"\` : "Loading tours..."}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
               </div>
            </div>
          </div>
        </div>
      </header>

`;
  
  const modifiedContent = content.substring(0, startIndex) + newReturn + content.substring(endIndex);
  fs.writeFileSync(filePath, modifiedContent, 'utf8');
  console.log("Successfully patched Header.js");
} else {
  console.log("Could not find targets in Header.js", startIndex, endIndex);
}
