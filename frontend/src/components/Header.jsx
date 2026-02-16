import { Link, useLocation, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Custom Animated Nav Link Component
const AnimatedNavLink = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `relative group font-medium text-lg tracking-wide transition-colors ${isActive ? 'font-bold' : ''
        }`
      }
    >
      <span className="relative inline-block overflow-hidden">
        <span className="block transition-transform duration-300 group-hover:-translate-y-full">
          {children}
        </span>
        <span className="absolute top-0 left-0 block translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-purple-500">
          {children}
        </span>
      </span>
      <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-purple-500 transition-all duration-300 group-hover:w-full"></span>
    </NavLink>
  );
};

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const LOGO_URL = 'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1765977541/Asset_7_kium0j.png';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <style>{`
        @keyframes letterDrop {
          from { transform: translateY(-30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
            ? 'bg-black/95 text-white backdrop-blur shadow-md py-4'
            : 'bg-transparent text-white py-8'
          }`}
      >
        <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <img
              src={LOGO_URL}
              alt="Gamotech"
              className="h-10 w-auto object-contain opacity-100 transition-opacity"
            />
            {/* White Text for the new dark hero */} 
          </Link>
          <ul className="flex items-center gap-10">
            <li>
              <AnimatedNavLink to="/">Home</AnimatedNavLink>
            </li>
            <li>
              <AnimatedNavLink to="/about">About</AnimatedNavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}