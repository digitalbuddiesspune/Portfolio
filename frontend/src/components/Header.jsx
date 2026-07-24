import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/GAMOTECH LOGO (2).png';

const navLinkClass = ({ isActive }) =>
  `text-sm font-medium transition-colors ${
    isActive ? 'text-white' : 'text-zinc-400 hover:text-white'
  }`;

export default function Header() {
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const prev = lastScrollY.current;

      if (y < 24) {
        setHidden(false);
      } else if (y > prev + 4) {
        // scrolling down
        setHidden(true);
      } else if (y < prev - 4) {
        // scrolling up
        setHidden(false);
      }

      lastScrollY.current = y;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 pt-3 sm:pt-5 pointer-events-none transition-transform duration-300 ease-out ${
        hidden ? '-translate-y-[120%]' : 'translate-y-0'
      }`}
    >
      <nav className="pointer-events-auto max-w-5xl mx-auto flex items-center justify-between gap-4 rounded-full border border-white/10 bg-black/90 backdrop-blur-md px-3 sm:px-5 py-2 sm:py-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
        <div className="flex items-center gap-5 sm:gap-8 min-w-0">
          <Link to="/" className="flex items-center shrink-0">
            <img
              src={logo}
              alt="Gamotech"
              className="h-8 sm:h-9 w-auto object-contain"
            />
          </Link>

          <ul className="hidden sm:flex items-center gap-6">
            <li>
              <NavLink to="/" end className={navLinkClass}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={navLinkClass}>
                About
              </NavLink>
            </li>
          </ul>
        </div>

        <a
          href="/#contact"
          className="shrink-0 inline-flex items-center justify-center rounded-full bg-white text-black text-xs sm:text-sm font-medium px-4 sm:px-5 py-2 sm:py-2.5 hover:bg-zinc-200 transition-colors"
        >
          Contact
        </a>
      </nav>
    </header>
  );
}
