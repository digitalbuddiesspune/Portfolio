import { Link } from 'react-router-dom';

const LOGO_URL = 'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1765977541/Asset_7_kium0j.png';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/10 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-2">
            <img
              src={LOGO_URL}
              alt="Gamotech"
              className="h-8 w-auto object-contain opacity-90"
            />
            <span className="font-bold text-white">Gamotech</span>
          </Link>
          <ul className="flex items-center gap-6">
            <li>
              <Link
                to="/"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-gray-400 hover:text-white transition-colors"
              >
                About
              </Link>
            </li>
          </ul>
        </div>
        <div className="mt-8 pt-8 border-t border-white/10 text-center text-gray-400 text-sm">
          © {currentYear} Gamotech. All rights reserved.
        </div>
      </div>
    </footer>
  );
}