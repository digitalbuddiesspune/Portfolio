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
      <section className="pt-28 pb-12 px-4 sm:px-6 bg-black">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
            About <span className="text-white font-bold">Gamotech</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            The people behind our vision and execution.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-black mb-10 text-center">
            Leadership
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
