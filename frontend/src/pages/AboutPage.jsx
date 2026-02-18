import { Link } from 'react-router-dom';

const HERO_IMAGE_URL =
  'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1771227140/Untitled_1920_x_600_px_1920_x_700_px_cq4vwz.png';
const MOBILE_HERO_IMAGE_URL =
  'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1771331559/office_meeting_1080x1080_svzdxg.png';

const FOUNDER = {
  name: 'Vinay Mathure',
  role: 'Founder & CEO',
  bio: 'The Founder & CEO of Gamotech IT & Web Solutions and a results-driven digital strategist with extensive expertise in performance marketing, high-converting landing pages, Facebook advertising, SEO optimization, and data-driven growth strategies. With strong proficiency in Google Analytics and deep experience in content and keyword research, he focuses on delivering measurable results that enhance brand visibility and maximize ROI. He brings leadership experience, technical excellence, and a passion for innovation, helping businesses build impactful digital presences and achieve sustainable growth through strategic, performance-focused solutions.',
  image: 'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1771067293/Trust_Your_Crazy_Ideas.heic_fsjin5.jpg',
};

const CO_FOUNDER = {
  name: 'Shubhangi Pardhi',
  role: 'Co-Founder',
  bio: 'The Co-Founder, is a dedicated SEO Executive and Digital Marketing specialist with strong expertise in search engine optimization, social media marketing, and performance-driven digital strategies. With a keen understanding of keyword research, content optimization, and audience targeting, she focuses on improving search rankings, increasing online visibility, and building strong brand engagement across digital platforms. Her strategic approach to social media campaigns and data-backed marketing initiatives helps businesses connect with the right audience, strengthen their online presence, and drive consistent growth in an ever-evolving digital landscape.',
  image: 'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1771068704/ChatGPT_Image_Feb_14_2026_05_00_38_PM_czonwy.jpg',
};

function TeamMember({ person, imageRight = false, delay = 0 }) {
  return (
    <div
      className={`flex flex-col sm:flex-row gap-8 sm:gap-12 items-center sm:items-start w-full opacity-0 animate-fade-in-up ${
        imageRight ? 'sm:flex-row-reverse' : ''
      }`}
      style={{ animationDelay: `${delay}s`, animationFillMode: 'forwards' }}
    >
      <div className="w-full sm:w-2/5 shrink-0 aspect-square overflow-hidden bg-gray-100 sm:max-w-sm rounded-lg transition-transform duration-300 hover:scale-[1.02]">
        <img
          src={person.image}
          alt={person.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-black">{person.name}</h3>
        <p className="text-gray-600 text-sm font-medium mb-3">{person.role}</p>
        <p className="text-gray-600 text-sm leading-relaxed">{person.bio}</p>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Static hero - content below scrolls over it */}
      <section className="fixed top-0 left-0 right-0 h-[85vh] z-0 flex items-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          {/* Desktop Hero Image */}
          <img
            src={HERO_IMAGE_URL}
            alt="About Gamotech"
            className="hidden md:block w-full h-full object-cover"
          />
          {/* Mobile Hero Image */}
          <img
            src={MOBILE_HERO_IMAGE_URL}
            alt="About Gamotech"
            className="block md:hidden w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 max-w-6xl w-full text-left px-4 sm:px-6 md:px-8 pl-8 sm:pl-10 md:pl-16 lg:pl-24">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-4 tracking-tight">
            About
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            The people behind our vision and execution.
          </p>
        </div>
      </section>

      {/* Spacer so content starts below hero */}
      <div className="relative z-10 h-[85vh] shrink-0" aria-hidden="true" />
      <section className="py-16 px-4 sm:px-6 bg-gray-50 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900 uppercase tracking-[0.02em] text-center mb-16 drop-shadow-[0_2px_4px_rgba(0,0,0,0.08)] leading-tight">
            <span className="block">The</span>
            <span className="block mt-2">Leader</span>
          </h2>
          <div className="space-y-24 w-full py-2">
            <TeamMember person={FOUNDER} delay={0.3} />
            <TeamMember person={CO_FOUNDER} imageRight delay={0.5} />
          </div>
          <div className="mt-14 text-center">
            <Link
              to="/"
              className="text-gray-800 hover:text-black font-semibold text-lg transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
