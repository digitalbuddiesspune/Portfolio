import { Link } from 'react-router-dom';

const LOGO_URL = 'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1765977541/Asset_7_kium0j.png';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur border-b border-white/10">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img
            src={LOGO_URL}
            alt="Gamotech"
            className="h-9 w-auto object-contain"
          /> 
        </Link>
        <ul className="flex items-center gap-6">
          <li>
            <Link
              to="/"
              className="text-gray-400 hover:text-white transition-colors font-medium"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="text-gray-400 hover:text-white transition-colors font-medium"
            >
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
