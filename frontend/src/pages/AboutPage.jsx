import { Link } from 'react-router-dom';

const FOUNDER = {
  name: 'Founder Name',
  role: 'Founder & CEO',
  bio: 'Visionary leader with a passion for gaming and technology. Bringing years of experience in product and engineering to build Gamotech from the ground up.',
  image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop',
};

const CO_FOUNDER = {
  name: 'Co-Founder Name',
  role: 'Co-Founder & CTO',
  bio: 'Technical architect and builder. Focused on scalable systems, game engines, and turning ideas into robust products that players and developers love.',
  image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
};

function TeamCard({ person }) {
  return (
    <article className="bg-white rounded-xl overflow-hidden border border-black/10 hover:border-black/20 transition-colors shadow-sm">
      <div className="aspect-square overflow-hidden bg-gray-100">
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
    </article>
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
          <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <TeamCard person={FOUNDER} />
            <TeamCard person={CO_FOUNDER} />
          </div>
          <div className="mt-12 text-center">
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
