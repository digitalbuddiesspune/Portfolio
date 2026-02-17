import { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowRight, Globe, Smartphone, ShoppingCart, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Placeholder for the generated hero image - using a high-quality Unsplash image as fallback
const HERO_IMAGE_URL = "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2669&auto=format&fit=crop";
// Contact section - handshake illustration (replace with your asset if needed)
const HANDSHAKE_IMAGE_URL = "https://res.cloudinary.com/dvkxgrcbv/image/upload/v1771311023/Untitled_1600_x_900_px_my29is.png";

const ServiceFlipCard = ({ title, icon, description }) => {
  return (
    <div className="group w-64 h-80 flex-shrink-0" style={{ perspective: '1000px' }}>
      <div
        className="relative w-full h-full transition-transform duration-700 ease-in-out group-hover:[transform:rotateY(180deg)]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-2xl border border-zinc-800 bg-zinc-900/90 backdrop-blur p-8 flex flex-col items-center justify-center"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="mb-4">{icon}</div>
          <h3 className="text-xl font-semibold text-white text-center">{title}</h3>
        </div>
        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl border border-zinc-800 bg-zinc-800/95 backdrop-blur p-6 flex flex-col items-center justify-center"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <h3 className="text-lg font-semibold text-white mb-3 text-center">{title}</h3>
          <p className="text-zinc-300 text-sm leading-relaxed text-center whitespace-pre-line">{description}</p>
        </div>
      </div>
    </div>
  );
};

const ProjectCard = ({ title, category, image }) => {
  return (
    <div className="group relative w-full aspect-[4/3] overflow-hidden bg-zinc-900 border border-zinc-800 rounded-2xl cursor-pointer shadow-lg hover:shadow-purple-900/20 transition-all duration-500">
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500 z-10" />
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 scale-100 group-hover:scale-110 transition-all duration-700 ease-out opacity-60 group-hover:opacity-100"
      />
      <div className="absolute inset-0 z-20 p-8 flex flex-col justify-between opacity-80 group-hover:opacity-100 transition-opacity">
        <div className="flex justify-between items-start translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <span className="text-xs font-mono text-zinc-100 tracking-widest uppercase border border-white/20 px-3 py-1 rounded-full bg-white/10 backdrop-blur">{category}</span>
          <ArrowUpRight className="text-white w-6 h-6 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500 delay-100" />
        </div>
        <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500 delay-75">
          <h3 className="text-4xl font-light text-white mb-2 tracking-tight">{title}</h3>
          <div className="h-[1px] w-0 group-hover:w-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-700 delay-200" />
        </div>
      </div>
    </div>
  );
};

const WORKS_TOTAL_PAGES = 7;

export default function HomePage() {
  const [offsetY, setOffsetY] = useState(0);
  const [worksPage, setWorksPage] = useState(1);
  const [contact, setContact] = useState({ name: '', company: '', phone: '', email: '', message: '' });
  const CONTACT_EMAIL = 'start@gamotech.com';

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

  const projects = [
    { title: "Fairytails", category: "E-Commerce", image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=2070&auto=format&fit=crop" },
    { title: "Windsmit", category: "Industrial", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2670&auto=format&fit=crop" },
    { title: "Dynamic World", category: "Consultancy", image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2670&auto=format&fit=crop" },
    { title: "Restrobazzar", category: "B2B Marketplace", image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=2670&auto=format&fit=crop" },
  ];

  return (
    <main className="bg-black text-white min-h-screen selection:bg-purple-500 selection:text-white font-outfit overflow-x-hidden">

      {/* 1. Static Hero - content below scrolls over it */}
      <section className="fixed top-0 left-0 right-0 h-[90vh] z-0 w-full flex items-center overflow-hidden">

        {/* Background Image */}
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
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center h-full">

          {/* Left: GAMOTECH Title - aligned left edge */}
          <div className="text-center md:text-left flex flex-col justify-center items-center md:items-start w-full">
            <h2 className="text-sm md:text-lg text-zinc-300 mb-6 font-bold tracking-[0.3em] uppercase animate-fadeInUp shadow-black/50 drop-shadow-md w-full md:w-auto">
              Reviewing The Future
            </h2>

            {/* GAMOTECH Split Animation (White Text) - same left edge as tagline */}
            <div className="group cursor-default md:text-left w-full flex justify-center md:justify-start">
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter text-white flex justify-center md:justify-start items-center gap-2 md:gap-4 transition-all duration-500 drop-shadow-2xl">
                <span className="inline-block transition-transform duration-500 ease-out group-hover:-translate-x-4">GAMO</span>
                <span className="inline-block transition-transform duration-500 ease-out group-hover:translate-x-4">TECH</span>
              </h1>
            </div> 
          </div>

          {/* Right: Feature Gradient Box - aligned to bottom */}
          <div className="flex justify-center md:justify-end items-center animate-fadeInUp self-center" style={{ animationDelay: '0.4s' }}>
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
      <section className="py-32 px-6 bg-black relative z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 text-center tracking-tight">
            Services We Provide
          </h2>
          <div className="flex flex-nowrap justify-center items-center gap-6 lg:gap-8">
            <ServiceFlipCard
              title="Web Development"
              icon={<Globe className="w-16 h-16 text-purple-500" />}
              description={`Building scalable web applications\nusing modern frameworks and technologies.\nWe create responsive and interactive websites\nthat provide exceptional user experiences.\nOur solutions are optimized for performance.`}
            />
            <ServiceFlipCard
              title="App Development"
              icon={<Smartphone className="w-16 h-16 text-yellow-500" />}
              description={`Native and cross-platform mobile apps\nthat engage users and grow your business.\nWe develop iOS and Android applications\nwith seamless user interfaces.\nOur apps are designed for scalability.`}
            />
            <ServiceFlipCard
              title="E-commerce Development"
              icon={<ShoppingCart className="w-16 h-16 text-pink-500" />}
              description={`Full-featured online stores with\npayment integration and seamless shopping.\nWe build secure e-commerce platforms\nthat drive sales and customer satisfaction.\nComplete solutions for your business needs.`}
            />
            <ServiceFlipCard
              title="CRM"
              icon={<Users className="w-16 h-16 text-indigo-400" />}
              description={`Customer relationship management systems\nto streamline sales and support processes.\nWe help you manage customer interactions\neffectively and improve business relationships.\nBoost your sales with our CRM solutions.`}
            />
          </div>
        </div>
      </section>

      {/* 3. Featured Projects */}
      <section className="py-32 px-6 bg-zinc-950 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-zinc-800 pb-10">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Works</span>
            </h2>
            <p className="text-zinc-400 max-w-md text-right mt-8 md:mt-0 text-xl font-light">
              A showcase of our recent partnerships and successful deliveries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {projects.map((project, index) => (
              <div key={`${worksPage}-${index}`} className={`${index % 2 === 1 ? 'md:translate-y-24' : ''}`}>
                <ProjectCard {...project} />
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center gap-4 mt-16 pt-10 border-t border-zinc-800">
            <button
              type="button"
              onClick={() => setWorksPage((p) => Math.max(1, p - 1))}
              disabled={worksPage === 1}
              className="flex items-center justify-center w-11 h-11 rounded-lg bg-zinc-800/80 text-zinc-400 hover:bg-zinc-700 hover:text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-zinc-800/80 disabled:hover:text-zinc-400"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <span className="min-w-[3rem] text-center text-lg font-semibold text-white">
              {worksPage}
            </span>
            <button
              type="button"
              onClick={() => setWorksPage((p) => Math.min(WORKS_TOTAL_PAGES, p + 1))}
              disabled={worksPage === WORKS_TOTAL_PAGES}
              className="flex items-center justify-center w-11 h-11 rounded-lg bg-zinc-800/80 text-zinc-400 hover:bg-zinc-700 hover:text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-zinc-800/80 disabled:hover:text-zinc-400"
              aria-label="Next page"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. Contact section - two columns: heading + handshake | form */}
      <section className="py-20 md:py-28 bg-[#f5f0ea] relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: heading, email, handshake image */}
            <div className="flex flex-col">
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
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
