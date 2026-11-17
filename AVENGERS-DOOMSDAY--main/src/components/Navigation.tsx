'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Search, Menu, X, Bookmark } from 'lucide-react';
import { useStore } from '@/store';

const navLinks = [
  { label: 'Movies', href: '/movies' },
  { label: 'TV Series', href: '/tv' },
  {
    label: 'Characters', href: '/characters',
    sub: [
      { label: 'Heroes', href: '/heroes' },
      { label: 'Villains', href: '/villains' },
      { label: 'All Characters', href: '/characters' },
    ],
  },
  {
    label: 'Archive', href: '/infinity-stones',
    sub: [
      { label: 'Infinity Stones', href: '/infinity-stones' },
      { label: 'Weapons & Artifacts', href: '/weapons' },
      { label: 'Technology', href: '/technology' },
      { label: 'Superpowers', href: '/powers' },
      { label: 'Teams & Organizations', href: '/teams' },
      { label: 'Locations', href: '/locations' },
    ],
  },
  { label: 'Timeline', href: '/timeline' },
  {
    label: 'More', href: '/multiverse',
    sub: [
      { label: 'Multiverse', href: '/multiverse' },
      { label: 'Easter Eggs', href: '/easter-eggs' },
      { label: 'Watch Tracker', href: '/watch-tracker' },
      { label: 'About', href: '/about' },
      { label: 'Admin Command', href: '/admin' },
    ],
  },
];

export default function Navigation() {
  const pathname = usePathname();
  const { theme, setSearchOpen } = useStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change (back/forward navigation)
  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen && !activeDropdown) return;
    const closeMenus = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setMobileOpen(false);
      setActiveDropdown(null);
    };
    window.addEventListener('keydown', closeMenus);
    return () => window.removeEventListener('keydown', closeMenus);
  }, [mobileOpen, activeDropdown]);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');
  const isLinkActive = (link: (typeof navLinks)[number]) =>
    link.sub ? link.sub.some((sub) => isActive(sub.href)) : isActive(link.href);

  return (
    <>
      <nav
        className={`nav-root ${scrolled ? 'nav-scrolled' : ''} ${pathname === '/' ? 'nav-home' : ''}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="nav-inner container-wide">
          {/* Logo */}
          <Link href="/" className="nav-logo" aria-label="Marvel Archives home">
            <span className="nav-logo-ma">MA</span>
            <span className="nav-logo-text">
              <span className="nav-logo-marvel">MARVEL</span>
              <span className="nav-logo-archives">ARCHIVES</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <ul className="nav-links" role="menubar">
            {navLinks.map(link => (
              <li
                key={link.href}
                className="nav-item"
                role="none"
                onMouseEnter={() => link.sub && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
                onFocus={() => link.sub && setActiveDropdown(link.label)}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                    setActiveDropdown(null);
                  }
                }}
              >
                <Link
                  href={link.href}
                  className={`nav-link ${isLinkActive(link) ? 'nav-link-active' : ''}`}
                  role="menuitem"
                  aria-haspopup={link.sub ? 'menu' : undefined}
                  aria-expanded={link.sub ? activeDropdown === link.label : undefined}
                >
                  {link.label}
                  {link.sub && <span className="nav-chevron">›</span>}
                </Link>

                {link.sub && activeDropdown === link.label && (
                  <div className="nav-dropdown" role="menu">
                    {link.sub.map(sub => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className={`nav-dropdown-item ${isActive(sub.href) ? 'nav-dropdown-item-active' : ''}`}
                        role="menuitem"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="nav-actions">
            <button
              onClick={() => {
                setMobileOpen(false);
                setSearchOpen(true);
              }}
              className="nav-action-btn"
              aria-label="Open search"
            >
              <Search size={17} />
            </button>
            <Link href="/watch-tracker" className="nav-action-btn" aria-label="Watch tracker">
              <Bookmark size={17} />
            </Link>
            <button
              className="nav-mobile-toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle mobile menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="nav-mobile">
            {navLinks.map(link => (
              <div key={link.href} className="nav-mobile-section">
                <Link
                  href={link.href}
                  className={`nav-mobile-link ${isLinkActive(link) ? 'nav-mobile-link-active' : ''}`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
                {link.sub && link.sub.map(sub => (
                  <Link
                    key={sub.href}
                    href={sub.href}
                    className="nav-mobile-sublink"
                    onClick={() => setMobileOpen(false)}
                  >
                    {sub.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        )}
      </nav>

      <style jsx>{`
        .nav-root {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          height: var(--nav-height);
          border-bottom: 1px solid transparent;
          transition: background 0.3s ease, border-color 0.3s ease;
        }
        .nav-scrolled {
          background: rgba(11, 13, 20, 0.95);
          border-color: var(--border);
          backdrop-filter: blur(12px);
        }
        .nav-inner {
          height: 100%;
          display: flex;
          align-items: center;
          gap: 2rem;
        }
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
          flex-shrink: 0;
        }
        .nav-logo-ma {
          width: 36px;
          height: 36px;
          background: var(--red-bright);
          color: white;
          font-family: var(--font-display);
          font-size: 1rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          letter-spacing: 0.05em;
        }
        .nav-logo-text {
          display: flex;
          flex-direction: column;
          line-height: 1;
        }
        .nav-logo-marvel {
          font-family: var(--font-body);
          font-size: 0.5rem;
          font-weight: 800;
          letter-spacing: 0.2em;
          color: var(--text-muted);
          text-transform: uppercase;
        }
        .nav-logo-archives {
          font-family: var(--font-display);
          font-size: 1rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          color: var(--text-primary);
        }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 0;
          list-style: none;
          margin: 0;
          padding: 0;
          flex: 1;
        }
        .nav-item {
          position: relative;
        }
        .nav-link {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.5rem 0.875rem;
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          text-decoration: none;
          color: var(--text-secondary);
          transition: color 0.15s ease;
          white-space: nowrap;
          height: var(--nav-height);
        }
        .nav-link:hover,
        .nav-link-active {
          color: var(--text-primary);
        }
        .nav-link-active {
          border-bottom: 2px solid var(--gold);
        }
        .nav-chevron {
          font-size: 0.875rem;
          opacity: 0.5;
          rotate: 90deg;
        }
        .nav-dropdown {
          position: absolute;
          top: calc(var(--nav-height) - 2px);
          left: 0;
          background: var(--midnight-2);
          border: 1px solid var(--border);
          min-width: 200px;
          padding: 0.5rem 0;
          z-index: 200;
        }
        .nav-dropdown-item {
          display: block;
          padding: 0.5rem 1rem;
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--text-secondary);
          text-decoration: none;
          transition: color 0.15s ease, background 0.15s ease;
          letter-spacing: 0.04em;
        }
        .nav-dropdown-item:hover,
        .nav-dropdown-item-active {
          color: var(--text-primary);
          background: var(--navy);
        }
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          margin-left: auto;
        }
        .nav-action-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          transition: color 0.15s ease;
          text-decoration: none;
        }
        .nav-action-btn:hover {
          color: var(--text-primary);
        }
        .nav-mobile-toggle {
          display: none;
        }
        .nav-mobile {
          position: fixed;
          top: var(--nav-height);
          left: 0;
          right: 0;
          bottom: 0;
          background: var(--midnight);
          border-top: 1px solid var(--border);
          overflow-y: auto;
          overscroll-behavior: contain;
          padding: 1rem 0;
          z-index: 99;
        }
        .nav-mobile-section {
          border-bottom: 1px solid var(--border);
          padding: 0.5rem 0;
        }
        .nav-mobile-link {
          display: block;
          padding: 0.75rem 1.5rem;
          font-family: var(--font-display);
          font-size: 1.125rem;
          font-weight: 500;
          color: var(--text-primary);
          text-decoration: none;
        }
        .nav-mobile-link-active {
          color: var(--gold);
        }
        .nav-mobile-sublink {
          display: block;
          padding: 0.375rem 2rem;
          font-size: 0.8125rem;
          color: var(--text-secondary);
          text-decoration: none;
        }
        @media (min-width: 1101px) {
          .nav-home {
            display: none !important;
          }
        }
        @media (max-width: 1100px) {
          .nav-links { display: none; }
          .nav-mobile-toggle { display: flex; }
        }
        @media (min-width: 1101px) {
          .nav-mobile { display: none; }
        }
      `}</style>
    </>
  );
}
