import React, { useState, useEffect } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useLottie } from "lottie-react";
import API_BASE_URL from "../config/api.js";

// Wrapper so useLottie hook is called in a stable component (not recreated each render)
function LottieView({ animationData }) {
  const { View } = useLottie({
    animationData,
    loop: true,
    style: { width: 120, height: 120 }
  });
  return <div className="w-32 h-32 flex items-center justify-center">{View}</div>;
}

// Corporate office/building hero image with parallax effect
const HERO_IMAGE_URL = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop";
// Contact section - handshake illustration (replace with your asset if needed)
const HANDSHAKE_IMAGE_URL = "https://res.cloudinary.com/dvkxgrcbv/image/upload/v1771311023/Untitled_1600_x_900_px_my29is.png";

const ServiceFlipCard = ({ title, icon, description }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const cardRef = React.useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleClick = () => {
    if (isMobile) {
      setIsFlipped(!isFlipped);
    }
  };

  const handleMouseEnter = () => {
    if (!isMobile && cardRef.current) {
      cardRef.current.style.transform = 'rotateY(180deg)';
      // Hide scrollbar when hovering
      document.body.classList.add('hide-scrollbar');
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile && cardRef.current) {
      cardRef.current.style.transform = 'rotateY(0deg)';
      // Show scrollbar when not hovering
      document.body.classList.remove('hide-scrollbar');
    }
  };

  return (
    <div 
      className="group w-72 h-80 flex-shrink-0 cursor-pointer overflow-hidden"
      style={{ perspective: '1000px' }}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        className="relative w-full h-full transition-transform duration-700 ease-in-out"
        style={{ 
          transformStyle: 'preserve-3d',
          transformOrigin: 'center center',
          ...(isMobile && {
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
          })
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-tl-none rounded-br-none rounded-tr-[50px] rounded-bl-[50px] border border-zinc-800 bg-zinc-900/90 backdrop-blur p-8 flex flex-col items-center justify-center"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="mb-4">{icon}</div>
          <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 text-center drop-shadow-sm">{title}</h3>
        </div>
        {/* Back */}
        <div
          className="absolute inset-0 rounded-tl-none rounded-br-none rounded-tr-[50px] rounded-bl-[50px] border border-zinc-800 bg-zinc-800/95 backdrop-blur p-6 flex flex-col items-center justify-center"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-3 text-center">{title}</h3>
          <p className="text-zinc-300 text-sm leading-relaxed text-center whitespace-pre-line">{description}</p>
        </div>
      </div>
    </div>
  );
};

const ProjectCard = ({ title, category, image, description, websiteLink }) => {
  // Format category for display
  const formatCategory = (cat) => {
    if (!cat) return '';
    return cat
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const displayCategory = formatCategory(category);

  return (
    <a
      href={websiteLink || '#'}
      target={websiteLink ? "_blank" : undefined}
      rel={websiteLink ? "noopener noreferrer" : undefined}
      className="group relative w-full aspect-[4/3] overflow-hidden bg-zinc-900 border border-zinc-800 rounded-2xl cursor-pointer shadow-lg hover:shadow-purple-900/20 transition-all duration-500 block"
      onMouseEnter={() => document.body.classList.add('hide-scrollbar')}
      onMouseLeave={() => document.body.classList.remove('hide-scrollbar')}
    >
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-500 z-10" />
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover scale-100 group-hover:scale-110 transition-all duration-700 ease-out opacity-90 group-hover:opacity-100"
      />
      <div className="absolute inset-0 z-20 p-8 flex flex-col justify-between">
        <div className="flex justify-between items-start translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <span className="text-xs font-mono text-zinc-100 tracking-widest uppercase border border-white/20 px-3 py-1 rounded-full bg-white/10 backdrop-blur">{displayCategory}</span>
          <ArrowUpRight className="text-white w-6 h-6 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500 delay-100" />
        </div>

        {/* Description overlay - shows in middle on hover */}
        <div className="absolute inset-0 flex items-center justify-center z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="bg-black/80 backdrop-blur-sm rounded-lg p-6 max-w-md mx-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <p className="text-white text-sm leading-relaxed text-center">{description || 'No description available.'}</p>
          </div>
        </div>

        <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500 delay-75 relative z-20">
          <h3 className="text-4xl font-light text-white mb-2 tracking-tight">{title}</h3>
          <div className="h-[1px] w-0 group-hover:w-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-700 delay-200" />
        </div>
      </div>
    </a>
  );
};

export default function HomePage() {
  const [offsetY, setOffsetY] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('website development');
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [contact, setContact] = useState({ name: '', company: '', phone: '', email: '', message: '' });
  const [testimonials, setTestimonials] = useState([]);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const ITEMS_PER_PAGE = 4;
  const ourWorkSectionRef = React.useRef(null);
  const testimonialsSectionRef = React.useRef(null);
  const testimonialTouchStart = React.useRef({ x: 0 });
  const CAROUSEL_INTERVAL_MS = 5000;
  const [animations, setAnimations] = useState({
    web: null,
    app: null,
    eccom: null,
    game: null,
    saas: null,
    salesforce: null,
    cloud: null,
    custom: null
  });
  const CONTACT_EMAIL = 'start@gamotech.com';

  const LottieRenderer = ({ animationData }) => {
    if (!animationData) {
      return <div className="w-20 h-20 bg-zinc-700 rounded-lg flex items-center justify-center text-zinc-400 text-xs">Loading...</div>;
    }
    return <LottieView animationData={animationData} />;
  };

  // Load animations dynamically
  useEffect(() => {
    const loadAnimations = async () => {
      try {
        const [
          webMod,
          appMod,
          eccomMod,
          gamingMod,
          crmMod,
          dataSecurityMod,
          programmingMod,
          deliverameAppMod
        ] = await Promise.all([
          import('../utilities/web.json'),
          import('../utilities/app.json'),
          import('../utilities/eccom.json'),
          import('../utilities/gaming.json'),
          import('../utilities/crm.json'),
          import('../utilities/DATA SECURITY.json'),
          import('../utilities/programming.json'),
          import('../utilities/deliverame app.json')
        ]);

        // Extract the actual JSON data - Vite wraps JSON in default
        const extractData = (module) => {
          if (!module) return null;
          if (module.v || module.layers) return module;
          if (module.default) {
            if (module.default.v || module.default.layers) return module.default;
            return module.default;
          }
          return module;
        };

        const loadedAnimations = {
          web: extractData(webMod) ? JSON.parse(JSON.stringify(extractData(webMod))) : null,
          app: extractData(appMod) ? JSON.parse(JSON.stringify(extractData(appMod))) : null,
          eccom: extractData(eccomMod) ? JSON.parse(JSON.stringify(extractData(eccomMod))) : null,
          game: extractData(gamingMod) ? JSON.parse(JSON.stringify(extractData(gamingMod))) : null,
          saas: extractData(crmMod) ? JSON.parse(JSON.stringify(extractData(crmMod))) : null,
          salesforce: extractData(dataSecurityMod) ? JSON.parse(JSON.stringify(extractData(dataSecurityMod))) : null,
          cloud: extractData(programmingMod) ? JSON.parse(JSON.stringify(extractData(programmingMod))) : null,
          custom: extractData(deliverameAppMod) ? JSON.parse(JSON.stringify(extractData(deliverameAppMod))) : null
        };

        setAnimations(loadedAnimations);
      } catch (error) {
        console.error('Failed to load Lottie animations:', error);
      }
    };

    loadAnimations();
  }, []);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // TODO: wire to backend or email service
    console.log('Contact form submitted:', contact);
    setContact({ name: '', company: '', phone: '', email: '', message: '' });
  };

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch portfolios from API
  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/admin/portfolio/public`);
        const data = await response.json();
        console.log('Portfolio API Response:', data);
        if (data.success) {
          console.log('Portfolios loaded:', data.data);
          setPortfolios(data.data || []);
        } else {
          console.error('API returned error:', data);
        }
      } catch (error) {
        console.error('Error fetching portfolios:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolios();
  }, []);

  // Fetch testimonials from API
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/admin/testimonials/public`);
        const data = await response.json();
        if (data.success && Array.isArray(data.data)) {
          setTestimonials(data.data);
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      }
    };
    fetchTestimonials();
  }, []);

  // Testimonials: carousel one at a time (testimonialIndex = starting index of the 3 visible)
  // Clamp when list shrinks
  useEffect(() => {
    if (testimonials.length > 0 && testimonialIndex >= testimonials.length) {
      setTestimonialIndex(0);
    }
  }, [testimonials.length, testimonialIndex]);

  // Auto carousel for testimonials (advance when more than one item)
  useEffect(() => {
    if (testimonials.length <= 1) return;
    const timer = setInterval(() => {
      setTestimonialIndex((i) => (i + 1) % testimonials.length);
    }, CAROUSEL_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  // Filter portfolios by category - more flexible matching
  const filteredPortfolios = portfolios.filter(portfolio => {
    const category = (portfolio.category || '').toLowerCase().trim();
    const selected = selectedCategory.toLowerCase().trim();

    console.log('Filtering:', { category, selected, portfolioName: portfolio.name });

    // First, try exact match (case-insensitive)
    if (category === selected) {
      return true;
    }

    // Normalize category names (remove hyphens, extra spaces, etc.)
    const normalizeCategory = (cat) => {
      return cat
        .replace(/-/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    };

    const normalizedCategory = normalizeCategory(category);
    const normalizedSelected = normalizeCategory(selected);

    // Map categories with flexible matching
    if (normalizedSelected.includes('website') || normalizedSelected.includes('web')) {
      // Match website/web development but exclude ecommerce
      return (normalizedCategory.includes('website') || normalizedCategory.includes('web')) &&
        !normalizedCategory.includes('ecommerce') &&
        !normalizedCategory.includes('e commerce');
    } else if (normalizedSelected.includes('ecommerce') || normalizedSelected.includes('e-commerce') || normalizedSelected.includes('e commerce')) {
      // Match ecommerce/e-commerce (with or without hyphen, with or without space)
      // Check both normalized and original category for maximum flexibility
      return normalizedCategory.includes('ecommerce') ||
        normalizedCategory.includes('e commerce') ||
        category.includes('e-commerce') ||
        category.includes('ecommerce') ||
        category === 'e-commerce development' ||
        category === 'ecommerce development';
    } else if (normalizedSelected.includes('app')) {
      return normalizedCategory.includes('app') ||
        normalizedCategory.includes('application');
    } else if (normalizedSelected.includes('game')) {
      return normalizedCategory.includes('game');
    } else if (normalizedSelected.includes('saas')) {
      return normalizedCategory.includes('saas');
    } else if (normalizedSelected.includes('salesforce')) {
      return normalizedCategory.includes('salesforce');
    } else if (normalizedSelected.includes('cloud')) {
      return normalizedCategory.includes('cloud');
    } else if (normalizedSelected.includes('custom') && normalizedSelected.includes('software')) {
      return normalizedCategory.includes('custom') && normalizedCategory.includes('software');
    }

    return false;
  });

  console.log('Filtered portfolios:', filteredPortfolios.length, 'for category:', selectedCategory);
  console.log('All portfolios categories:', portfolios.map(p => ({ name: p.name, category: p.category })));

  // Pagination
  const totalPages = Math.ceil(filteredPortfolios.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedPortfolios = filteredPortfolios.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Reset to page 1 when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  // Category buttons
  const categories = [
    { id: 'website development', label: 'Website Development' },
    { id: 'e-commerce development', label: 'E-commerce Development' },
    { id: 'app development', label: 'App Development' },
    { id: 'game development', label: 'Game Development' },
    { id: 'saas', label: 'SaaS' },
    { id: 'salesforce development', label: 'Salesforce Development' },
    { id: 'cloud based development', label: 'Cloud Based Development' },
    { id: 'custom software development', label: 'Custom Software Development' }
  ];

  return (
    <main className="bg-black text-white min-h-screen selection:bg-purple-500 selection:text-white font-outfit overflow-x-hidden">

      {/* 1. Static Hero - content below scrolls over it */}
      <section className="fixed top-0 left-0 right-0 h-[90vh] z-0 w-full flex items-center overflow-hidden">

        {/* Background Image - Static */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src={HERO_IMAGE_URL}
            alt="Corporate Office"
            className="w-full h-full object-cover"
          />
          {/* Dark Overlay for Text Readability */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Main Content Grid */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col items-center justify-center h-full">

          {/* Feature Gradient Box - centered horizontally */}
          <div className="flex justify-center items-center animate-fadeInUp">
            <div className="w-full max-w-md p-10 md:p-14 rounded-none md:rounded-lg backdrop-blur-md shadow-2xl relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(67,35,35,0.7), rgba(182,174,159,0.65), rgba(67,35,35,0.7))'
              }}
            >
              {/* Decorative Line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-transparent"></div>

              <h3 className="text-3xl md:text-4xl font-light mb-6 text-white leading-tight">
                We combine <br />
                <span className="font-bold">design, thinking</span> <br />
                and <span className="font-bold">technical</span>.
              </h3>

              <p className="text-zinc-200 text-lg leading-relaxed font-light">
                Gamotech is a premier IT solutions provider. We specialize in building high-performance web applications, complex e-commerce platforms, and digital experiences that drive growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer so content starts below hero; scrolling content has higher z so it slides over hero */}
      <div className="relative z-10 h-[90vh] shrink-0" aria-hidden="true" />
      {/* 2. Services We Provide */}
      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-black relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8 sm:mb-12 md:mb-16 text-center tracking-tight">
            Services We Provide
          </h2>
          {/* Row 1: Original 4 cards */}
          <div className="flex flex-wrap sm:flex-nowrap justify-center items-center gap-4 sm:gap-6 lg:gap-8 overflow-x-auto overflow-y-hidden pb-4 sm:pb-0 px-2">
            <ServiceFlipCard
              title="Web Development"
              icon={<LottieRenderer animationData={animations.web} />}
              description={`Building scalable web applications\nusing modern frameworks and technologies.\nWe create responsive and interactive websites\nthat provide exceptional user experiences.\nOur solutions are optimized for performance.`}
            />
            <ServiceFlipCard
              title="App Development"
              icon={<LottieRenderer animationData={animations.app} />}
              description={`Native and cross-platform mobile apps\nthat engage users and grow your business.\nWe develop iOS and Android applications\nwith seamless user interfaces.\nOur apps are designed for scalability.`}
            />
            <ServiceFlipCard
              title="E-commerce Development"
              icon={<LottieRenderer animationData={animations.eccom} />}
              description={`Full-featured online stores with\npayment integration and seamless shopping.\nWe build secure e-commerce platforms\nthat drive sales and customer satisfaction.\nComplete solutions for your business needs.`}
            />
            <ServiceFlipCard
              title="Game Development"
              icon={<LottieRenderer animationData={animations.game} />}
              description={`Engaging games for web, mobile, and desktop.\nWe build 2D and 3D games with modern engines\nand frameworks. From concept to launch,\nwe deliver immersive experiences for players.`}
            />
          </div>
          {/* Row 2: 4 new service cards */}
          <div className="flex flex-wrap sm:flex-nowrap justify-center items-center gap-4 sm:gap-6 lg:gap-8 overflow-x-auto overflow-y-hidden pt-8 sm:pt-10 lg:pt-12 pb-4 sm:pb-0 px-2">
            <ServiceFlipCard
              title="SaaS"
              icon={<LottieRenderer animationData={animations.saas} />}
              description={`Software as a Service solutions built for scale.\nWe design and develop cloud-hosted applications\nwith subscription models, multi-tenancy,\nand seamless updates for your users.`}
            />
            <ServiceFlipCard
              title="Salesforce Development"
              icon={<LottieRenderer animationData={animations.salesforce} />}
              description={`Custom Salesforce solutions and integrations.\nWe extend and automate your CRM with Apex,\nLightning components, and connected apps\nto maximize your Salesforce investment.`}
            />
            <ServiceFlipCard
              title="Cloud Based Development"
              icon={<LottieRenderer animationData={animations.cloud} />}
              description={`Cloud-native applications on AWS, Azure, or GCP.\nWe build scalable, secure systems with\ncontainers, serverless, and managed services\nfor reliability and cost efficiency.`}
            />
            <ServiceFlipCard
              title="Custom Software Development"
              icon={<LottieRenderer animationData={animations.custom} />}
              description={`Tailored software for your unique workflows.\nFrom internal tools to client-facing platforms,\nwe deliver custom applications that fit\nyour business requirements exactly.`}
            />
          </div>
        </div>
      </section>

      {/* 3. Featured Projects (Our Work) */}
      <section ref={ourWorkSectionRef} className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-zinc-950 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 sm:mb-12 border-b border-zinc-800 pb-6 sm:pb-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter mb-4 md:mb-0">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Works</span>
            </h2>
            <p className="text-zinc-400 max-w-md text-left md:text-right mt-4 md:mt-0 text-base sm:text-lg md:text-xl font-light">
              A showcase of our recent partnerships and successful deliveries.
            </p>
          </div>

          {/* Toggle Buttons */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-all duration-300 ${selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white'
                  }`}
              >
                {cat.label}
              </button>
            ))}
          </div>



          {/* Portfolio Grid */}
          {loading ? (
            <div className="text-center py-20">
              <p className="text-zinc-400 text-lg">Loading portfolios...</p>
            </div>
          ) : portfolios.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-zinc-400 text-xl">No portfolios found. Please check if the backend server is running.</p>
            </div>
          ) : filteredPortfolios.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-zinc-400 text-xl">
                {selectedCategory === 'game development'
                  ? 'Future projects incoming'
                  : `No ${selectedCategory} projects available yet.`}
              </p>
              <p className="text-zinc-500 text-sm mt-2">
                Available categories: {[...new Set(portfolios.map(p => p.category))].join(', ')}
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 overflow-visible pb-16 sm:pb-24 md:pb-32">
                {paginatedPortfolios.map((portfolio, index) => (
                  <div
                    key={portfolio._id || index}
                    className={`${index % 2 === 1 ? 'md:translate-y-24' : ''}`}
                  >
                    <ProjectCard
                      title={portfolio.name || 'Untitled'}
                      category={portfolio.category || ''}
                      image={portfolio.image || ''}
                      description={portfolio.description || ''}
                      websiteLink={portfolio.websiteLink || ''}
                    />
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center items-center gap-4 mt-16 pt-10 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => {
                    if (currentPage === 1) {
                      // If on first page, scroll to top of portfolio section
                      ourWorkSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    } else {
                      // Go to previous page and scroll to portfolio section
                      setCurrentPage((p) => Math.max(1, p - 1));
                      setTimeout(() => {
                        ourWorkSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }, 100);
                    }
                  }}
                  className="flex items-center justify-center w-11 h-11 rounded-lg bg-zinc-800/80 text-zinc-400 hover:bg-zinc-700 hover:text-white transition-all"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <span className="min-w-[3rem] text-center text-lg font-semibold text-white">
                  {currentPage} / {totalPages}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    if (currentPage === totalPages) {
                      // If on last page, scroll to testimonials section
                      testimonialsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    } else {
                      // Go to next page and scroll to portfolio section
                      setCurrentPage((p) => Math.min(totalPages, p + 1));
                      setTimeout(() => {
                        ourWorkSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }, 100);
                    }
                  }}
                  className="flex items-center justify-center w-11 h-11 rounded-lg bg-zinc-800/80 text-zinc-400 hover:bg-zinc-700 hover:text-white transition-all"
                  aria-label="Next page"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Client Testimonials - responsive: 1 card carousel < lg, 2 cards md-lg, 3 cards lg+ */}
      <section className="pt-4 sm:pt-6 md:pt-8 pb-12 sm:pb-16 md:pb-20 lg:pb-24 xl:pb-32 px-4 sm:px-6 bg-black relative z-10 overflow-visible">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 sm:mb-8 md:mb-10 lg:mb-12 xl:mb-16 text-center tracking-tight">
            Client Testimonials
          </h2>
          {testimonials.length === 0 ? (
            <div className="text-center py-8 sm:py-12 text-zinc-400 text-sm sm:text-base">
              <p>No testimonials yet. Check back soon.</p>
            </div>
          ) : (
            <>
              {/* Mobile / tablet: single-card carousel (visible below lg) */}
              <div
                className="lg:hidden w-full max-w-[min(340px,100%-5rem)] sm:max-w-[min(380px,100%-5rem)] mx-auto touch-pan-y overflow-visible"
                onTouchStart={(e) => {
                  testimonialTouchStart.current = { x: e.touches[0].clientX };
                }}
                onTouchEnd={(e) => {
                  if (testimonials.length <= 1) return;
                  const dx = e.changedTouches[0].clientX - testimonialTouchStart.current.x;
                  if (dx > 50) setTestimonialIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
                  else if (dx < -50) setTestimonialIndex((i) => (i + 1) % testimonials.length);
                }}
              >
                <div className="relative flex items-center gap-1 sm:gap-2">
                  <button
                    type="button"
                    onClick={() => setTestimonialIndex((i) => (i - 1 + testimonials.length) % testimonials.length)}
                    className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-zinc-800/90 text-zinc-300 hover:bg-zinc-700 hover:text-white flex items-center justify-center transition-colors z-10"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <div className="flex-1 min-w-0 overflow-visible">
                    {(() => {
                      const t = testimonials[testimonialIndex];
                      if (!t) return null;
                      return (
                        <div
                          key={t._id || t.projectName + (t.clientName || '')}
                          className="w-full max-w-[300px] sm:max-w-[340px] mx-auto bg-zinc-900/90 border border-zinc-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 pt-14 sm:pt-16 pb-8 sm:pb-10 shadow-xl overflow-visible"
                        >
                          {/* Same as desktop: avatar overlaps top of card via negative margin */}
                          <div className="flex justify-center -mt-16 sm:-mt-20 mb-4 relative mx-auto overflow-visible">
                            <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-full overflow-hidden border-[3px] sm:border-4 border-white/90 shadow-lg bg-white">
                              <div className="absolute inset-0 flex items-center justify-center text-zinc-700 text-xl sm:text-2xl font-bold bg-white">
                                {(() => {
                                  const n = (t.clientName || t.projectName || '').trim();
                                  if (!n) return '?';
                                  const parts = n.split(/\s+/).filter(Boolean);
                                  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase().slice(0, 2);
                                  return n.slice(0, 2).toUpperCase();
                                })()}
                              </div>
                              {t.avatar && (
                                <img
                                  src={t.avatar}
                                  alt={t.projectName}
                                  className="absolute inset-0 w-full h-full object-cover"
                                  onError={(e) => { e.target.style.display = 'none'; }}
                                />
                              )}
                            </div>
                          </div>
                          <h3 className="text-lg sm:text-xl font-bold text-white text-center mb-1">
                            {t.projectName}
                          </h3>
                          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed text-left mb-4">
                            {t.description}
                          </p>
                          {(t.clientName || t.clientLocation) && (
                            <div className="flex justify-between items-center gap-2 mb-4">
                              <span className="text-zinc-400 text-sm font-medium truncate">{t.clientName}</span>
                              <span className="text-zinc-500 text-sm italic truncate">{t.clientLocation}</span>
                            </div>
                          )}
                          <div className="flex justify-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-5 h-5 sm:w-6 sm:h-6 ${
                                  star <= (t.stars || 5)
                                    ? 'text-amber-400 fill-amber-400'
                                    : 'text-zinc-600'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                  <button
                    type="button"
                    onClick={() => setTestimonialIndex((i) => (i + 1) % testimonials.length)}
                    className="flex-shrink-0 w-10 h-10 rounded-full bg-zinc-800/90 text-zinc-300 hover:bg-zinc-700 hover:text-white flex items-center justify-center transition-colors z-10"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
                {testimonials.length > 1 && (
                  <div className="flex justify-center gap-2 mt-6">
                    {testimonials.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setTestimonialIndex(i)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          i === testimonialIndex ? 'bg-purple-500 scale-125' : 'bg-zinc-600 hover:bg-zinc-500'
                        }`}
                        aria-label={`Go to testimonial ${i + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Desktop: 2 cards on lg, 3 on xl (visible from lg up) */}
              <div className="hidden lg:block">
                <div className="flex flex-wrap justify-center gap-4 lg:gap-6 xl:gap-8 max-w-5xl xl:max-w-6xl mx-auto">
                  {(testimonials.length <= 3
                    ? testimonials
                    : Array.from({ length: 3 }, (_, i) => {
                        const idx = (testimonialIndex + i) % testimonials.length;
                        return testimonials[idx];
                      })
                  ).map((t) => (
                    <div
                      key={t._id || t.projectName + (t.clientName || '')}
                      className="w-full max-w-[300px] xl:max-w-[340px] bg-zinc-900/90 border border-zinc-800 rounded-2xl xl:rounded-3xl p-6 xl:p-8 pt-14 xl:pt-16 pb-8 xl:pb-10 shadow-xl overflow-visible"
                    >
                      <div className="flex justify-center -mt-16 xl:-mt-20 mb-4 relative mx-auto overflow-visible">
                        <div className="relative w-20 h-20 xl:w-24 xl:h-24 flex-shrink-0 rounded-full overflow-hidden border-[3px] xl:border-4 border-white/90 shadow-lg bg-white">
                          <div className="absolute inset-0 flex items-center justify-center text-zinc-700 text-xl xl:text-2xl font-bold bg-white">
                            {(() => {
                              const n = (t.clientName || t.projectName || '').trim();
                              if (!n) return '?';
                              const parts = n.split(/\s+/).filter(Boolean);
                              if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase().slice(0, 2);
                              return n.slice(0, 2).toUpperCase();
                            })()}
                          </div>
                          {t.avatar && (
                            <img
                              src={t.avatar}
                              alt={t.projectName}
                              className="absolute inset-0 w-full h-full object-cover"
                              onError={(e) => { e.target.style.display = 'none'; }}
                            />
                          )}
                        </div>
                      </div>
                      <h3 className="text-lg xl:text-xl font-bold text-white text-center mb-1">
                        {t.projectName}
                      </h3>
                      <p className="text-zinc-300 text-sm leading-relaxed text-left mb-3 xl:mb-4">
                        {t.description}
                      </p>
                      {(t.clientName || t.clientLocation) && (
                        <div className="flex justify-between items-center gap-2 mb-3 xl:mb-4">
                          <span className="text-zinc-400 text-sm font-medium truncate">{t.clientName}</span>
                          <span className="text-zinc-500 text-sm italic truncate">{t.clientLocation}</span>
                        </div>
                      )}
                      <div className="flex justify-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 xl:w-5 xl:h-5 ${
                              star <= (t.stars || 5)
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-zinc-600'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                {testimonials.length > 3 && (
                  <div className="flex justify-center gap-2 mt-6 xl:mt-8">
                    {testimonials.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setTestimonialIndex(i)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          i === testimonialIndex ? 'bg-purple-500 scale-125' : 'bg-zinc-600 hover:bg-zinc-500'
                        }`}
                        aria-label={`Go to testimonial ${i + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </section>

      {/* 4. Contact section - two columns: heading + handshake | form */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-[#f5f0ea] relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
            {/* Left: heading, email, handshake image */}
            <div className="flex flex-col">
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4 sm:mb-6">
                Let's scale your brand, together.
              </h2>
              <div className="mt-auto pt-8">
                <img
                  src={HANDSHAKE_IMAGE_URL}
                  alt="Handshake"
                  className="w-full max-w-md object-contain object-left-bottom grayscale contrast-110 opacity-90"
                />
              </div>
            </div>

            {/* Right: contact form */}
            <form onSubmit={handleContactSubmit} className="space-y-6 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <label className="block">
                  <span className="text-gray-900 text-sm font-medium mb-1 block">Name</span>
                  <input
                    type="text"
                    required
                    value={contact.name}
                    onChange={(e) => setContact((c) => ({ ...c, name: e.target.value }))}
                    placeholder="Type name"
                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-gray-800 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 transition-colors"
                  />
                </label>
                <label className="block">
                  <span className="text-gray-900 text-sm font-medium mb-1 block">Company</span>
                  <input
                    type="text"
                    required
                    value={contact.company}
                    onChange={(e) => setContact((c) => ({ ...c, company: e.target.value }))}
                    placeholder="Type company name"
                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-gray-800 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 transition-colors"
                  />
                </label>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <label className="block">
                  <span className="text-gray-900 text-sm font-medium mb-1 block">Email</span>
                  <input
                    type="email"
                    required
                    value={contact.email}
                    onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))}
                    placeholder="Type email address"
                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-gray-800 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 transition-colors"
                  />
                </label>
                <label className="block">
                  <span className="text-gray-900 text-sm font-medium mb-1 block">Phone</span>
                  <input
                    type="tel"
                    value={contact.phone}
                    onChange={(e) => setContact((c) => ({ ...c, phone: e.target.value }))}
                    placeholder="Type phone number"
                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-gray-800 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 transition-colors"
                  />
                </label>
              </div>
              <label className="block">
                <span className="text-gray-900 text-sm font-medium mb-1 block">Want to know more? Drop us a line!</span>
                <textarea
                  required
                  rows={3}
                  value={contact.message}
                  onChange={(e) => setContact((c) => ({ ...c, message: e.target.value }))}
                  placeholder="Your message"
                  className="w-full px-0 py-3 bg-transparent border-0 border-b border-gray-800 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 transition-colors resize-none"
                />
              </label>
              <div className="pt-4 flex justify-start">
                <button
                  type="submit"
                  className="bg-black text-white px-8 justify-start py-4 text-base font-semibold hover:bg-gray-800 transition-colors rounded-full inline-flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-white justify-start" />
                  <span className="justify-center">Get in touch</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
