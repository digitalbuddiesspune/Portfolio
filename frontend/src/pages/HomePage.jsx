import React, { useState, useEffect } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Star,
  Monitor,
  ShoppingCart,
  Smartphone,
  Cloud,
  CloudUpload,
  Gamepad2,
  Building2,
  ExternalLink,
  Briefcase,
  Code2,
  Clock,
  Link2,
  FileText,
  Rocket,
  Smile,
  ShieldCheck,
  Globe,
} from "lucide-react";
import API_BASE_URL from "../config/api.js";
import heroDashboard from "../assets/hero-dashboard.png";

// Contact section - handshake illustration (replace with your asset if needed)
const HANDSHAKE_IMAGE_URL = "https://res.cloudinary.com/dvkxgrcbv/image/upload/v1771311023/Untitled_1600_x_900_px_my29is.png";


const SERVICES = [
  {
    title: "Web Development",
    description: "Modern, responsive websites built for speed, SEO, and conversion.",
    Icon: Monitor,
    accent: {
      dot: "bg-purple-400 shadow-[0_0_10px_rgba(192,132,252,0.9)]",
      halo: "bg-purple-500/25",
      ring: "border-purple-400/40",
      icon: "text-purple-300",
      btn: "border-purple-400/50 text-purple-300 hover:bg-purple-500/15",
    },
  },
  {
    title: "App Development",
    description: "iOS & Android apps with smooth UX and scalable architecture.",
    Icon: Smartphone,
    accent: {
      dot: "bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.9)]",
      halo: "bg-blue-500/25",
      ring: "border-blue-400/40",
      icon: "text-blue-300",
      btn: "border-blue-400/50 text-blue-300 hover:bg-blue-500/15",
    },
  },
  {
    title: "E-commerce Development",
    description: "High-converting online stores with secure payments & inventory.",
    Icon: ShoppingCart,
    accent: {
      dot: "bg-orange-400 shadow-[0_0_10px_rgba(251,146,60,0.9)]",
      halo: "bg-orange-500/25",
      ring: "border-orange-400/40",
      icon: "text-orange-300",
      btn: "border-orange-400/50 text-orange-300 hover:bg-orange-500/15",
    },
  },
  {
    title: "Game Development",
    description: "Engaging 2D/3D games for web and mobile platforms.",
    Icon: Gamepad2,
    accent: {
      dot: "bg-pink-400 shadow-[0_0_10px_rgba(244,114,182,0.9)]",
      halo: "bg-pink-500/25",
      ring: "border-pink-400/40",
      icon: "text-pink-300",
      btn: "border-pink-400/50 text-pink-300 hover:bg-pink-500/15",
    },
  },
  {
    title: "SaaS Development",
    description: "Multi-tenant SaaS products with billing and dashboards.",
    Icon: Cloud,
    accent: {
      dot: "bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.9)]",
      halo: "bg-cyan-500/25",
      ring: "border-cyan-400/40",
      icon: "text-cyan-300",
      btn: "border-cyan-400/50 text-cyan-300 hover:bg-cyan-500/15",
    },
  },
  {
    title: "Salesforce Development",
    description: "Custom Salesforce apps, Apex, and CRM automation.",
    Icon: Building2,
    accent: {
      dot: "bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.9)]",
      halo: "bg-sky-500/25",
      ring: "border-sky-400/40",
      icon: "text-sky-300",
      btn: "border-sky-400/50 text-sky-300 hover:bg-sky-500/15",
    },
  },
  {
    title: "Cloud Based Development",
    description: "Cloud-native systems on AWS, Azure, and GCP.",
    Icon: CloudUpload,
    accent: {
      dot: "bg-violet-400 shadow-[0_0_10px_rgba(167,139,250,0.9)]",
      halo: "bg-violet-500/25",
      ring: "border-violet-400/40",
      icon: "text-violet-300",
      btn: "border-violet-400/50 text-violet-300 hover:bg-violet-500/15",
    },
  },
  {
    title: "Custom Software Development",
    description: "Bespoke software tailored to your business workflows.",
    Icon: Code2,
    accent: {
      dot: "bg-fuchsia-400 shadow-[0_0_10px_rgba(232,121,249,0.9)]",
      halo: "bg-fuchsia-500/25",
      ring: "border-fuchsia-400/40",
      icon: "text-fuchsia-300",
      btn: "border-fuchsia-400/50 text-fuchsia-300 hover:bg-fuchsia-500/15",
    },
  },
];

const ServiceCard = ({ title, description, Icon, accent }) => (
  <article className="group relative flex flex-col items-center rounded-2xl bg-white/[0.03] backdrop-blur-sm px-4 pt-5 pb-4 transition-all duration-300 hover:bg-white/[0.06]">
    {/* Top-left glow dot */}
    <span className={`absolute top-3.5 left-3.5 w-1.5 h-1.5 rounded-full ${accent.dot}`} aria-hidden />

    {/* Icon with soft halo */}
    <div className="relative flex items-center justify-center w-16 h-16 mb-3">
      <span className={`absolute inset-0 rounded-full blur-xl ${accent.halo}`} aria-hidden />
      <div className={`relative w-12 h-12 rounded-full border bg-black/40 flex items-center justify-center ${accent.ring}`}>
        <Icon className={`w-5 h-5 ${accent.icon}`} strokeWidth={1.5} />
      </div>
    </div>

    <h3 className="text-[13px] sm:text-sm font-semibold text-white text-center mb-1.5 leading-snug">
      {title}
    </h3>
    <p className="text-zinc-500 text-[11px] leading-snug text-center mb-4 line-clamp-2 min-h-[2.2em]">
      {description}
    </p>

    <a
      href="#contact"
      className={`mt-auto w-8 h-8 rounded-full border flex items-center justify-center transition-all ${accent.btn}`}
      aria-label={`Learn more about ${title}`}
    >
      <ArrowRight className="w-3.5 h-3.5" />
    </a>
  </article>
);

const formatCategoryLabel = (cat) => {
  if (!cat) return "";
  return cat
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const TECH_BY_CATEGORY = {
  "website development": "React, Node.js, MongoDB, Tailwind CSS",
  "e-commerce development": "React, Node.js, Stripe, MongoDB",
  "app development": "React Native, Node.js, Firebase",
  "game development": "Unity, C#, WebGL",
  saas: "React, Node.js, AWS, PostgreSQL",
  "salesforce development": "Apex, Lightning, Salesforce APIs",
  "cloud based development": "AWS, Docker, Kubernetes",
  "custom software development": "React, Node.js, Custom APIs",
};

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [contact, setContact] = useState({ name: '', company: '', phone: '', email: '', message: '' });
  const [testimonials, setTestimonials] = useState([]);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const ourWorkSectionRef = React.useRef(null);
  const stackRef = React.useRef(null);
  const [servicesPin, setServicesPin] = useState("relative"); // relative | fixed | absolute

  const carouselRef = React.useRef(null);
  const testimonialsSectionRef = React.useRef(null);
  const testimonialTouchStart = React.useRef({ x: 0 });
  const CAROUSEL_INTERVAL_MS = 5000;
  const CONTACT_EMAIL = 'start@gamotech.com';

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // TODO: wire to backend or email service
    console.log('Contact form submitted:', contact);
    setContact({ name: '', company: '', phone: '', email: '', message: '' });
  };

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

    if (selected === 'all') return true;

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

  const featuredProject = filteredPortfolios[featuredIndex] || null;

  // Reset featured index when category changes
  useEffect(() => {
    setFeaturedIndex(0);
  }, [selectedCategory]);

  // Keep featured index in range when list shrinks
  useEffect(() => {
    if (filteredPortfolios.length === 0) {
      setFeaturedIndex(0);
      return;
    }
    if (featuredIndex >= filteredPortfolios.length) {
      setFeaturedIndex(0);
    }
  }, [filteredPortfolios.length, featuredIndex]);

  // Pin Services at top; Our Work layers over it while scrolling through the stack
  useEffect(() => {
    let current = "relative";
    const updatePin = () => {
      const stack = stackRef.current;
      if (!stack) return;
      const rect = stack.getBoundingClientRect();
      const vh = window.innerHeight;
      let next = "relative";
      if (rect.top <= 0 && rect.bottom > vh) next = "fixed";
      else if (rect.top <= 0) next = "absolute";
      if (next !== current) {
        current = next;
        setServicesPin(next);
      }
    };
    updatePin();
    window.addEventListener("scroll", updatePin, { passive: true });
    window.addEventListener("resize", updatePin);
    return () => {
      window.removeEventListener("scroll", updatePin);
      window.removeEventListener("resize", updatePin);
    };
  }, []);

  const goToPrevProject = () => {
    if (filteredPortfolios.length === 0) return;
    setFeaturedIndex((i) => (i - 1 + filteredPortfolios.length) % filteredPortfolios.length);
  };

  const goToNextProject = () => {
    if (filteredPortfolios.length === 0) return;
    setFeaturedIndex((i) => (i + 1) % filteredPortfolios.length);
  };

  const scrollCarousel = (dir) => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({ left: dir * 280, behavior: 'smooth' });
  };

  // Category filter buttons (circular icons)
  const categories = [
    { id: 'all', label: 'All Works', Icon: Globe },
    { id: 'website development', label: 'Website', Icon: Monitor },
    { id: 'e-commerce development', label: 'E-commerce', Icon: ShoppingCart },
    { id: 'app development', label: 'App', Icon: Smartphone },
    { id: 'saas', label: 'SaaS', Icon: Cloud },
    { id: 'salesforce development', label: 'Salesforce', Icon: Building2 },
    { id: 'game development', label: 'Game', Icon: Gamepad2 },
  ];

  const WORK_STATS = [
    { value: '20+', label: 'Projects Delivered', Icon: Rocket },
    { value: '15+', label: 'Happy Clients', Icon: Smile },
    { value: '50K+', label: 'Lines of Code', Icon: Code2 },
    { value: '100%', label: 'On-Time Delivery', Icon: ShieldCheck },
  ];

  const DURATION_BY_CATEGORY = {
    "website development": "3 Months",
    "e-commerce development": "4 Months",
    "app development": "4 Months",
    "game development": "6 Months",
    saas: "5 Months",
    "salesforce development": "3 Months",
    "cloud based development": "4 Months",
    "custom software development": "5 Months",
  };

  return (
    <main className="bg-black text-white min-h-screen selection:bg-purple-500 selection:text-white font-outfit">

      {/* 1. Hero — Foundrs structure in React, logo gold theme + dashboard image */}
      <section
        className="relative z-[1] text-[#1a1510] flex flex-col items-center overflow-hidden sm:overflow-visible"
        style={{
          background: "#ffffff",
        }}
      >
        {/* Drifting / bouncing gold blobs (logo colors) */}
        <div className="hero-blob-field" aria-hidden>
          <div className="hero-ring hero-ring-r1" />
          <div className="hero-ring hero-ring-r2" />
          <div className="hero-blob hero-blob-b1" />
          <div className="hero-blob hero-blob-b2" />
          <div className="hero-blob hero-blob-b3" />
          <div className="hero-blob hero-blob-b4" />
          <div className="hero-blob hero-blob-b5" />
          <div className="hero-dot hero-dot-d1" />
          <div className="hero-dot hero-dot-d2" />
          <div className="hero-dot hero-dot-d3" />
        </div>

        <div className="relative z-[3] w-full flex flex-col items-center px-4 sm:px-6 pt-[4.75rem] sm:pt-28 pb-0">
          <p className="hero-eyebrow text-[11px] sm:text-[13px] tracking-[0.14em] uppercase font-semibold text-[#5c5346] mb-2 sm:mb-3.5">
            Gamotech
          </p>

          <h1 className="hero-title text-[clamp(28px,9vw,96px)] font-extrabold tracking-[-0.02em] leading-[0.95] text-center text-[#1a1510]">
            Your digital
            <br />
            <span className="text-[#d4a017]">journey begins</span>
          </h1>

          <p className="hero-sub mt-2.5 sm:mt-[18px] max-w-[520px] text-center text-[#5c5346] text-[13px] sm:text-base leading-snug sm:leading-relaxed px-1">
            One partner to design, build, and scale your web, app, and cloud products — from first idea to lasting growth.
          </p>

          <p
            className="hidden sm:block mt-5 sm:mt-6 z-[3] text-[#5c5346] text-[13px]"
            style={{ opacity: 0, animation: "hero-rise 0.8s ease forwards 1.1s" }}
          >
            Built for brands that want to scale.
          </p>

          {/* Laptop mockup — smaller on phone, full image, flush to black section */}
          <div className="hero-mockup-wrap mt-4 sm:mt-10 mb-0 w-[78%] max-w-[300px] sm:w-full sm:max-w-[680px] md:max-w-[740px] relative z-20">
            <div className="overflow-hidden w-full mx-auto drop-shadow-[0_18px_36px_rgba(26,21,16,0.28)]">
              <img
                src={heroDashboard}
                alt="Gamotech Solutions dashboard"
                className="block w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services pins; Our Work layers over it on scroll */}
      <div ref={stackRef} className="relative">
        {/* Spacer: scroll room while services is fixed */}
        <div className="h-screen w-full" aria-hidden />
        <section
          id="services"
          className={`w-full h-screen pt-14 sm:pt-16 md:pt-20 pb-10 sm:pb-14 md:pb-16 px-4 sm:px-6 bg-black flex flex-col justify-start overflow-hidden z-10 ${
            servicesPin === "fixed"
              ? "fixed top-0 left-0 right-0"
              : servicesPin === "absolute"
                ? "absolute inset-x-0 bottom-0"
                : "absolute inset-x-0 top-0"
          }`}
        >
        {/* Soft purple weave + spark dots */}
        <div className="pointer-events-none absolute inset-0 opacity-45" aria-hidden>
          <svg className="absolute top-8 right-0 w-[70%] h-[45%]" viewBox="0 0 800 400" fill="none">
            <path d="M50 80C150 20 250 140 350 90C450 40 550 150 700 80" stroke="#a855f7" strokeWidth="1.2" opacity="0.55" />
            <path d="M30 160C140 100 260 200 380 140C500 80 620 210 780 130" stroke="#c084fc" strokeWidth="1" opacity="0.35" />
            <path d="M80 240C180 180 300 280 420 220C540 160 660 290 790 210" stroke="#8b5cf6" strokeWidth="1" opacity="0.3" />
            <circle cx="180" cy="70" r="2" fill="#e9d5ff" opacity="0.7" />
            <circle cx="420" cy="50" r="1.5" fill="#f0abfc" opacity="0.6" />
            <circle cx="620" cy="110" r="2" fill="#c084fc" opacity="0.65" />
          </svg>
          <svg className="absolute bottom-16 left-0 w-[55%] h-[35%]" viewBox="0 0 700 300" fill="none">
            <path d="M20 100C120 40 220 160 340 100C460 40 560 170 680 90" stroke="#d8b4fe" strokeWidth="1" opacity="0.28" />
            <circle cx="90" cy="140" r="1.5" fill="#e9d5ff" opacity="0.5" />
            <circle cx="300" cy="80" r="2" fill="#a855f7" opacity="0.55" />
          </svg>
        </div>
        <div className="pointer-events-none absolute top-24 left-1/2 -translate-x-1/2 w-80 h-80 bg-purple-600/10 blur-[110px] rounded-full" aria-hidden />

        <div className="max-w-6xl mx-auto relative w-full">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-10">
            <p className="text-[11px] sm:text-xs tracking-[0.28em] uppercase text-purple-400 font-medium mb-2.5">
              What We Do
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold tracking-tight mb-3">
              <span className="text-white">Services </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-orange-400">
                We Provide
              </span>
            </h2>
            <p className="text-zinc-400 text-sm max-w-lg mx-auto">
              End-to-end digital solutions for startups and enterprises.
            </p>
          </div>

          {/* Compact 2x4 grid */}
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {SERVICES.map((service) => (
                <ServiceCard key={service.title} {...service} />
              ))}
            </div>
          </div>

          {/* Slim CTA bar */}
          <div className="mt-8 sm:mt-10 max-w-5xl mx-auto rounded-xl border border-white/5 bg-white/[0.03] backdrop-blur-md px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <span className="hidden sm:flex w-9 h-9 rounded-full border border-purple-500/40 bg-purple-500/10 items-center justify-center shrink-0">
                <Rocket className="w-4 h-4 text-purple-300" />
              </span>
              <p className="text-zinc-300 text-xs sm:text-sm">
                Have a project in mind? Let&apos;s build something amazing together.
              </p>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-purple-300 hover:text-purple-200 transition-colors shrink-0"
            >
              Get In Touch
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
        </section>

      {/* 3. Our Work — exact gold / charcoal / off-white reference layout */}
      <section
        id="our-work"
        ref={ourWorkSectionRef}
        className="relative z-20 pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 text-[#111] overflow-hidden shadow-[0_-40px_80px_rgba(0,0,0,0.35)] rounded-t-[28px] sm:rounded-t-[40px]"
        style={{ background: "#f7f7f5" }}
      >
        {/* Faint gold wavy lines + dots (watermark) */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <svg className="absolute -top-6 right-0 w-[65%] h-[50%] opacity-[0.22]" viewBox="0 0 800 500" fill="none">
            <path d="M50 80C120 40 200 120 280 90C360 60 420 140 500 110C580 80 650 160 740 100" stroke="#FFB400" strokeWidth="1.2" />
            <path d="M30 160C110 120 190 200 270 170C350 140 430 220 510 180C590 140 670 230 780 170" stroke="#FFB400" strokeWidth="1" />
            <path d="M80 240C150 200 230 280 320 250C410 220 480 300 570 260C660 220 720 310 790 250" stroke="#EAB308" strokeWidth="1" />
          </svg>
          <svg className="absolute bottom-8 left-0 w-[50%] h-[35%] opacity-[0.18] rotate-180" viewBox="0 0 800 400" fill="none">
            <path d="M50 80C120 40 200 120 280 90C360 60 420 140 500 110C580 80 650 160 740 100" stroke="#FFB400" strokeWidth="1" />
            <path d="M30 160C110 120 190 200 270 170C350 140 430 220 510 180C590 140 670 230 780 170" stroke="#EAB308" strokeWidth="1" />
          </svg>
          <div
            className="absolute bottom-10 right-8 w-48 h-32 opacity-[0.2]"
            style={{
              backgroundImage: "radial-gradient(circle, #FFB400 1px, transparent 1px)",
              backgroundSize: "14px 14px",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto relative">
          {/* Header — title + filters on one line */}
          <div className="mb-6 sm:mb-8">
            <p className="text-[11px] sm:text-xs tracking-[0.3em] uppercase font-semibold text-[#FFB400] mb-2">
              Portfolio
            </p>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 lg:gap-8">
              <div className="min-w-0 shrink-0">
                <h2 className="text-3xl sm:text-4xl md:text-[3.25rem] font-bold tracking-tight uppercase leading-none mb-2 sm:mb-3">
                  <span className="text-[#111]">Our </span>
                  <span className="text-[#FFB400]">Work</span>
                </h2>
                <p className="text-zinc-500 text-sm sm:text-[15px] max-w-md leading-relaxed lg:max-w-sm">
                  Explore our latest builds — websites, apps, and platforms crafted for growth.
                </p>
              </div>

              <div className="flex flex-nowrap justify-start lg:justify-end gap-2.5 sm:gap-3.5 overflow-x-auto pb-1 scrollbar-none" style={{ scrollbarWidth: "none" }}>
                {categories.map(({ id, label, Icon }) => {
                  const isActive = selectedCategory === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setSelectedCategory(id)}
                      className="flex flex-col items-center gap-1.5 group min-w-[3.75rem] sm:min-w-[4.25rem] shrink-0"
                    >
                      <span
                        className={`w-11 h-11 sm:w-[3.4rem] sm:h-[3.4rem] rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                          isActive
                            ? "bg-[#111] border-[#FFB400] text-white shadow-[0_8px_20px_rgba(0,0,0,0.18)]"
                            : "bg-white border-zinc-300 text-zinc-400 hover:border-[#FFB400] hover:text-[#111]"
                        }`}
                      >
                        <Icon className="w-[18px] h-[18px]" strokeWidth={1.75} />
                      </span>
                      <span
                        className={`text-[10px] sm:text-[11px] font-medium whitespace-nowrap pb-1 border-b-2 transition-colors ${
                          isActive
                            ? "text-[#111] border-[#FFB400]"
                            : "text-zinc-500 border-transparent group-hover:text-zinc-700"
                        }`}
                      >
                        {label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Featured project */}
          {loading ? (
            <div className="text-center py-20">
              <p className="text-zinc-500 text-lg">Loading portfolios...</p>
            </div>
          ) : portfolios.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-zinc-500 text-xl">No portfolios found. Please check if the backend server is running.</p>
            </div>
          ) : filteredPortfolios.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-zinc-500 text-xl">No projects in this category yet.</p>
            </div>
          ) : featuredProject ? (
            <>
              <div className="relative">
                {filteredPortfolios.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={goToPrevProject}
                      className="hidden lg:flex absolute -left-4 xl:-left-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full border border-white/15 bg-[#1a1a1a]/95 text-white items-center justify-center hover:border-[#FFB400] hover:text-[#FFB400] transition-all shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
                      aria-label="Previous project"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={goToNextProject}
                      className="hidden lg:flex absolute -right-4 xl:-right-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full border border-white/15 bg-[#1a1a1a]/95 text-white items-center justify-center hover:border-[#FFB400] hover:text-[#FFB400] transition-all shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
                      aria-label="Next project"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Dark featured card with gradient + glow */}
                <div
                  className="relative rounded-[28px] sm:rounded-[32px] overflow-hidden text-white shadow-[0_30px_70px_-24px_rgba(0,0,0,0.55)]"
                  style={{
                    background:
                      "radial-gradient(ellipse 80% 70% at 25% 40%, #2a2a2a 0%, #161616 45%, #0c0c0c 100%)",
                  }}
                >
                  {/* Soft gold glow behind mockups */}
                  <div
                    className="pointer-events-none absolute left-[8%] top-[20%] w-[42%] h-[55%] rounded-full blur-[80px] opacity-30"
                    style={{ background: "radial-gradient(circle, #FFB400 0%, transparent 70%)" }}
                    aria-hidden
                  />
                  {/* Subtle mesh */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-[0.07]"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)",
                      backgroundSize: "28px 28px",
                    }}
                    aria-hidden
                  />

                  <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 p-6 sm:p-8 lg:p-10 items-center">
                    {/* Device mockups */}
                    <div className="relative">
                      <span className="absolute -top-1 left-0 z-20 inline-flex items-center gap-1.5 text-[10px] tracking-[0.14em] uppercase font-bold text-[#111] bg-[#FFB400] px-3 py-1.5 rounded-full shadow-[0_6px_16px_rgba(255,180,0,0.35)]">
                        <Star className="w-3 h-3 fill-current" />
                        Featured Project
                      </span>

                      <div className="relative mt-8 flex items-end justify-center min-h-[260px] sm:min-h-[320px]">
                        <div className="relative w-[88%] sm:w-[85%] z-10 drop-shadow-[0_20px_40px_rgba(0,0,0,0.55)]">
                          <div className="rounded-t-xl border border-zinc-500/70 bg-[#1c1c1c] p-1.5 sm:p-2">
                            <div className="rounded-lg overflow-hidden aspect-[16/10] bg-zinc-950">
                              <img
                                src={featuredProject.image}
                                alt={featuredProject.name || "Featured project"}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                          <div className="h-2 sm:h-2.5 bg-gradient-to-b from-zinc-600 to-zinc-800 rounded-b-md mx-auto w-[102%]" />
                          <div className="h-1.5 bg-zinc-800 rounded-b-xl mx-auto w-[60%] opacity-90" />
                        </div>

                        <div className="absolute right-0 sm:right-2 bottom-2 z-20 w-[28%] sm:w-[26%] max-w-[120px] drop-shadow-[0_16px_28px_rgba(0,0,0,0.55)]">
                          <div className="rounded-[1.15rem] border-[3px] border-zinc-400/80 bg-zinc-950 p-1">
                            <div className="mx-auto mb-1 h-1 w-8 rounded-full bg-zinc-600" />
                            <div className="rounded-[0.7rem] overflow-hidden aspect-[9/16] bg-zinc-900">
                              <img
                                src={featuredProject.image}
                                alt=""
                                className="w-full h-full object-cover object-left"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Project details — yellow outlined square icons */}
                    <div>
                      <span className="inline-block text-[10px] tracking-[0.18em] uppercase font-bold text-[#FFB400] border border-[#FFB400] px-3.5 py-1.5 rounded-full mb-4">
                        {formatCategoryLabel(featuredProject.category)}
                      </span>
                      <h3 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-bold text-white mb-3.5 tracking-tight leading-[1.1]">
                        {featuredProject.name || "Untitled"}
                      </h3>
                      <p className="text-zinc-400 text-sm sm:text-[15px] leading-relaxed mb-6 max-w-md">
                        {featuredProject.description ||
                          "A high-performance digital experience crafted to scale with your business and deliver measurable results."}
                      </p>

                      <div className="space-y-4 mb-7">
                        <div className="flex items-start gap-3.5">
                          <span className="w-10 h-10 rounded-lg border border-[#FFB400] bg-[#FFB400]/10 flex items-center justify-center shrink-0">
                            <Code2 className="w-[18px] h-[18px] text-[#FFB400]" strokeWidth={1.75} />
                          </span>
                          <div className="min-w-0 pt-0.5">
                            <p className="text-[11px] uppercase tracking-[0.14em] font-bold text-[#FFB400] mb-0.5">
                              Tech Stack
                            </p>
                            <p className="text-white text-sm sm:text-[15px] leading-snug">
                              {TECH_BY_CATEGORY[featuredProject.category] || "Modern web stack"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3.5">
                          <span className="w-10 h-10 rounded-lg border border-[#FFB400] bg-[#FFB400]/10 flex items-center justify-center shrink-0">
                            <Briefcase className="w-[18px] h-[18px] text-[#FFB400]" strokeWidth={1.75} />
                          </span>
                          <div className="min-w-0 pt-0.5">
                            <p className="text-[11px] uppercase tracking-[0.14em] font-bold text-[#FFB400] mb-0.5">
                              Category
                            </p>
                            <p className="text-white text-sm sm:text-[15px] leading-snug">
                              {featuredProject.webType || formatCategoryLabel(featuredProject.category)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3.5">
                          <span className="w-10 h-10 rounded-lg border border-[#FFB400] bg-[#FFB400]/10 flex items-center justify-center shrink-0">
                            <Clock className="w-[18px] h-[18px] text-[#FFB400]" strokeWidth={1.75} />
                          </span>
                          <div className="min-w-0 pt-0.5">
                            <p className="text-[11px] uppercase tracking-[0.14em] font-bold text-[#FFB400] mb-0.5">
                              Duration
                            </p>
                            <p className="text-white text-sm sm:text-[15px] leading-snug">
                              {DURATION_BY_CATEGORY[featuredProject.category] || "3 Months"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3.5">
                          <span className="w-10 h-10 rounded-lg border border-[#FFB400] bg-[#FFB400]/10 flex items-center justify-center shrink-0">
                            <Link2 className="w-[18px] h-[18px] text-[#FFB400]" strokeWidth={1.75} />
                          </span>
                          <div className="min-w-0 pt-0.5">
                            <p className="text-[11px] uppercase tracking-[0.14em] font-bold text-[#FFB400] mb-0.5">
                              Live Preview
                            </p>
                            {featuredProject.websiteLink ? (
                              <a
                                href={featuredProject.websiteLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white hover:text-[#FFB400] text-sm sm:text-[15px] inline-flex items-center gap-1.5 transition-colors leading-snug"
                              >
                                {featuredProject.websiteLink.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                                <ExternalLink className="w-3.5 h-3.5 text-[#FFB400]" />
                              </a>
                            ) : (
                              <p className="text-zinc-500 text-sm sm:text-[15px]">Coming soon</p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        {featuredProject.websiteLink ? (
                          <a
                            href={featuredProject.websiteLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-[#111] bg-[#FFB400] hover:bg-[#ffc107] transition-all shadow-[0_8px_24px_rgba(255,180,0,0.35)]"
                          >
                            View Live Project
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        ) : null}
                        <a
                          href={featuredProject.websiteLink || "#"}
                          target={featuredProject.websiteLink ? "_blank" : undefined}
                          rel={featuredProject.websiteLink ? "noopener noreferrer" : undefined}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-transparent border border-white/60 hover:border-[#FFB400] hover:text-[#FFB400] transition-all"
                        >
                          <FileText className="w-4 h-4" />
                          View Case Study
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Pagination at bottom of card */}
                  <div className="relative flex flex-col items-center gap-2 pb-5 sm:pb-6 -mt-2">
                    <div className="w-20 h-[3px] rounded-full bg-[#FFB400]" />
                    <p className="text-[11px] sm:text-xs text-zinc-400 tracking-[0.28em] font-medium">
                      {String(featuredIndex + 1).padStart(2, "0")} / {String(filteredPortfolios.length).padStart(2, "0")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Thumbnail carousel */}
              <div className="mt-6 sm:mt-7 relative px-9 sm:px-11">
                <button
                  type="button"
                  onClick={() => scrollCarousel(-1)}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-[#2a2a2a] text-white hover:bg-[#FFB400] hover:text-[#111] shadow-md flex items-center justify-center transition-colors"
                  aria-label="Scroll projects left"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollCarousel(1)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-[#2a2a2a] text-white hover:bg-[#FFB400] hover:text-[#111] shadow-md flex items-center justify-center transition-colors"
                  aria-label="Scroll projects right"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <div
                  ref={carouselRef}
                  className="flex gap-3 sm:gap-4 overflow-x-auto py-2 scroll-smooth"
                  style={{ scrollbarWidth: "none" }}
                >
                  {filteredPortfolios.map((project, index) => {
                    const isActive = index === featuredIndex;
                    return (
                      <button
                        key={project._id || index}
                        type="button"
                        onClick={() => setFeaturedIndex(index)}
                        className={`group flex-shrink-0 w-40 sm:w-48 text-left rounded-2xl overflow-hidden border-[3px] transition-all duration-300 ${
                          isActive
                            ? "border-[#FFB400] shadow-[0_0_18px_rgba(255,180,0,0.35)]"
                            : "border-transparent opacity-85 hover:opacity-100"
                        }`}
                      >
                        <div className="relative aspect-[5/3] bg-zinc-200 rounded-[13px] overflow-hidden">
                          <img
                            src={project.image}
                            alt={project.name || `Project ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                          <p className="absolute bottom-2 left-2 right-2 text-xs sm:text-sm font-semibold text-white truncate">
                            {project.name || "Untitled"}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          ) : null}

          {/* Stats bar — solid gold circles, black icons */}
          <div className="mt-6 sm:mt-8 rounded-[22px] sm:rounded-[28px] bg-white shadow-[0_16px_50px_-18px_rgba(0,0,0,0.18)] px-5 sm:px-8 py-5 sm:py-6 grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {WORK_STATS.map(({ value, label, Icon }) => (
              <div key={label} className="flex items-center gap-3 sm:gap-4">
                <span className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#FFB400] flex items-center justify-center text-[#111] shrink-0 shadow-[0_6px_16px_rgba(255,180,0,0.35)]">
                  <Icon className="w-5 h-5" strokeWidth={2} />
                </span>
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-[#111] leading-none">{value}</p>
                  <p className="text-xs sm:text-sm text-zinc-500 mt-1">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </div>

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
      <section id="contact" className="py-12 sm:py-16 md:py-20 lg:py-28 bg-[#f5f0ea] relative z-10">
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

      {/* Solid black so fixed hero does not show through below contact */}
      <div className="relative z-10 bg-black h-16 sm:h-24" aria-hidden="true" />
    </main>
  );
}
