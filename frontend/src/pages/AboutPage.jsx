import { Link } from 'react-router-dom';

const FOUNDER = {
  name: 'Vinay Mathure',
  role: 'Founder & CEO',
  bio: 'The Founder & CEO of Gamotech IT & Web Solutions and a results-driven digital strategist with extensive expertise in performance marketing, high-converting landing pages, Facebook advertising, SEO optimization, and data-driven growth strategies. With strong proficiency in Google Analytics and deep experience in content and keyword research, he focuses on delivering measurable results that enhance brand visibility and maximize ROI. He brings leadership experience, technical excellence, and a passion for innovation, helping businesses build impactful digital presences and achieve sustainable growth through strategic, performance-focused solutions.',
  image: 'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1771067293/Trust_Your_Crazy_Ideas.heic_fsjin5.jpg',
};

const CO_FOUNDER = {
  name: 'Shubhangi Pardhi',
  role: 'Co-Founder & CTO',
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
      <div className="min-w-0 flex-1 text-left">
        <h3 className="text-2xl sm:text-3xl font-bold text-black tracking-tight mb-2">
          {person.name}
        </h3>
        <p className="text-gray-600 font-medium mb-4 text-base border-b border-black/10 pb-4 inline-block">
          {person.role}
        </p>
        <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
          {person.bio}
        </p>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <section className="relative pt-32 pb-20 px-4 sm:px-6 bg-black overflow-hidden">
        {/* Subtle gradient accent */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent pointer-events-none" aria-hidden />
        <div className="relative max-w-4xl mx-auto text-center">
          <h1
            className="text-4xl sm:text-6xl md:text-7xl font-bold text-white mb-5 tracking-tight opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}
          >
            About <span className="text-white">Gamotech</span>
          </h1>
          <div
            className="w-16 h-0.5 bg-white/40 mx-auto mb-6 opacity-0 animate-fade-in"
            style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
            aria-hidden
          />
          <p
            className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
          >
            The people behind our vision and execution.
          </p>
        </div>
      </section>

      <section className="py-24 px-6 sm:px-10 md:px-12 bg-gray-50 w-full">
        <div className="w-full max-w-6xl mx-auto">
          <h2
            className="text-3xl sm:text-4xl font-bold text-black mb-16 text-center tracking-tight opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
          >
            Leadership
          </h2>
          <div className="space-y-24 w-full py-2">
            <TeamMember person={FOUNDER} delay={0.3} />
            <TeamMember person={CO_FOUNDER} imageRight delay={0.5} />
          </div>
          <div className="mt-14 text-center">
            <Link
              to="/"
              className="text-gray-600 hover:text-black font-medium transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
