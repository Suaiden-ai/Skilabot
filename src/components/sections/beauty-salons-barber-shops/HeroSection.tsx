import { Sparkles, Scissors, Smile, CalendarCheck2 } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-pink-100 via-purple-50 to-yellow-50 py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left: Content */}
        <div className="space-y-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Transform Your Beauty Salon or Barber Shop with <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-yellow-400 bg-clip-text text-transparent">Skilabot</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-6">
            Automate bookings, delight your clients, and grow your business with smart tools designed for beauty professionals.
          </p>
          <ul className="space-y-3 mb-8">
            <li className="flex items-center gap-3 text-gray-800 font-medium">
              <Sparkles className="w-5 h-5 text-pink-400" /> Personalized client experience
            </li>
            <li className="flex items-center gap-3 text-gray-800 font-medium">
              <CalendarCheck2 className="w-5 h-5 text-purple-400" /> Online booking & reminders
            </li>
            <li className="flex items-center gap-3 text-gray-800 font-medium">
              <Scissors className="w-5 h-5 text-yellow-400" /> Staff & schedule management
            </li>
            <li className="flex items-center gap-3 text-gray-800 font-medium">
              <Smile className="w-5 h-5 text-pink-300" /> Loyalty & feedback tools
            </li>
          </ul>
          <a
            href="#plans"
            className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-yellow-400 text-white font-bold text-lg shadow-lg hover:scale-105 transition-transform duration-200"
          >
            Try Skilabot for Free
          </a>
        </div>
        {/* Right: Visual/Stats */}
        <div className="relative flex flex-col items-center justify-center">
          <div className="w-80 h-80 bg-gradient-to-br from-pink-200 via-purple-100 to-yellow-100 rounded-full flex items-center justify-center shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop"
              alt="Beauty salon illustration"
              className="w-60 h-60 object-cover rounded-full shadow-lg border-8 border-white"
            />
          </div>
          {/* Floating Metrics */}
          <div className="absolute -top-6 -left-8 bg-white rounded-2xl p-4 shadow-lg border border-pink-100 animate-fade-in">
            <div className="text-xs text-gray-600 mb-1">Monthly Bookings</div>
            <div className="text-pink-500 font-bold text-lg">+2,500</div>
          </div>
          <div className="absolute -bottom-6 -right-8 bg-white rounded-2xl p-4 shadow-lg border border-yellow-100 animate-fade-in">
            <div className="text-xs text-gray-600 mb-1">Client Satisfaction</div>
            <div className="text-yellow-500 font-bold text-lg">98%</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 