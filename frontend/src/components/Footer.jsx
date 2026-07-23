import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone } from 'lucide-react';
import logo from '../assets/GAMOTECH LOGO (2).png';

const FOOTER_DESCRIPTION =
  "Gamotech IT & Web Solutions transforms business ideas into impactful digital experiences through innovative, high-performance web and IT solutions that help brands stay ahead of the competition.";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-20 border-t border-white/10 mt-auto bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12">
          {/* Left: Company info */}
          <div>
            <Link to="/" className="inline-block">
              <img
                src={logo}
                alt="Gamotech"
                className="h-9 w-auto object-contain"
              />
            </Link> 
            <h3 className="text-white font-bold uppercase tracking-wide text-sm mb-2">
              About our company
            </h3>
            <div className="w-12 h-0.5 bg-amber-400 rounded mb-4" aria-hidden />
            <p className="text-gray-400 text-sm leading-relaxed">
              {FOOTER_DESCRIPTION}
            </p>
          </div>

          {/* Middle: Explore */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-wide text-sm mb-2">
              Explore
            </h3>
            <div className="w-12 h-0.5 bg-amber-400 rounded mb-4" aria-hidden />
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-amber-400 hover:text-amber-300 transition-colors text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-amber-400 hover:text-amber-300 transition-colors text-sm"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Right: Contact */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-wide text-sm mb-2">
              Contact
            </h3>
            <div className="w-12 h-0.5 bg-amber-400 rounded mb-4" aria-hidden />
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-400" aria-hidden />
                <address className="not-italic text-gray-400 leading-relaxed">
                  618, Gera's Imperum Rise, Wipro Circle, Hinjewadi,
                  
                  Pune – 411057
                </address>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-400" aria-hidden />
                <a
                  href="mailto:info@gamotech.com"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  info@gamotech.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-400" aria-hidden />
                <div className="flex flex-col gap-1">
                  <a
                    href="tel:+919637319746"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    +91 96373 19746
                  </a>
                  <a
                    href="tel:+919766670916"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    +91 97666 70916
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-gray-400 text-sm">
          © {currentYear} Gamotech. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
