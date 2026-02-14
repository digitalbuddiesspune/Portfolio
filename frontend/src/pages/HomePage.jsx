import { Link } from 'react-router-dom';

const LOGO_URL = 'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1765977541/Asset_7_kium0j.png';

const PROJECTS = [
  {
    id: 1,
    title: 'Project Alpha',
    description: 'Next-gen gaming platform with real-time multiplayer and cross-platform support.',
    tags: ['Gaming', 'Multiplayer', 'Web'],
  },
  {
    id: 2,
    title: 'Project Nexus',
    description: 'Unified dashboard for game analytics, player insights, and monetization tools.',
    tags: ['Analytics', 'Dashboard', 'SaaS'],
  },
  {
    id: 3,
    title: 'Project Forge',
    description: 'Toolkit for indie developers to build, publish, and monetize games globally.',
    tags: ['Dev Tools', 'Publishing', 'Indie'],
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="pt-28 pb-20 px-4 sm:px-6 bg-black">
        <div className="max-w-6xl mx-auto text-center">
          <img
            src={LOGO_URL}
            alt="Gamotech"
            className="h-20 w-auto mx-auto mb-6 object-contain"
          />
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
            Welcome to <span className="text-white font-bold">Gamotech</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            We build experiences at the intersection of games and technology.
          </p>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-16 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-black mb-8 text-center">
            Company Info
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 border border-black/10 shadow-sm">
              <h3 className="text-black font-semibold mb-2">Mission</h3>
              <p className="text-gray-600">
                To empower creators and players with innovative technology and memorable experiences.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-black/10 shadow-sm">
              <h3 className="text-black font-semibold mb-2">Vision</h3>
              <p className="text-gray-600">
                A world where games and tech seamlessly connect people and possibilities.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-black/10 shadow-sm sm:col-span-2 lg:col-span-1">
              <h3 className="text-black font-semibold mb-2">What We Do</h3>
              <p className="text-gray-600">
                Game development, platform engineering, and tech solutions for the gaming industry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-black mb-8 text-center">
            Our Projects
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((project) => (
              <article
                key={project.id}
                className="bg-gray-50 rounded-xl p-6 border border-black/10 hover:border-black/20 transition-colors"
              >
                <h3 className="text-lg font-semibold text-black mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-black/10 text-gray-700 border border-black/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* About Us preview */}
      <section className="py-16 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-black mb-4">
            About Us
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Meet the people behind Gamotech — our founder and co-founder who drive our vision and build the future of gaming tech.
          </p>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-black text-white font-semibold hover:bg-gray-800 transition-colors"
          >
            Meet the Team
          </Link>
        </div>
      </section>
    </main>
  );
}
