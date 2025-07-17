import { Building2, Users, ShieldCheck, CalendarCheck2 } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-green-100 via-blue-50 to-gray-50 py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left: Content */}
        <div className="space-y-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Modernize Your Condominium Management with <span className="bg-gradient-to-r from-green-500 via-blue-400 to-gray-400 bg-clip-text text-transparent">Skilabot</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-6">
            Automate communications, streamline tasks, and improve resident satisfaction with smart tools for administrators and property managers.
          </p>
          <ul className="space-y-3 mb-8">
            <li className="flex items-center gap-3 text-gray-800 font-medium">
              <Building2 className="w-5 h-5 text-green-500" /> Centralized building management
            </li>
            <li className="flex items-center gap-3 text-gray-800 font-medium">
              <Users className="w-5 h-5 text-blue-400" /> Resident communication & support
            </li>
            <li className="flex items-center gap-3 text-gray-800 font-medium">
              <ShieldCheck className="w-5 h-5 text-green-400" /> Secure document & payment tracking
            </li>
            <li className="flex items-center gap-3 text-gray-800 font-medium">
              <CalendarCheck2 className="w-5 h-5 text-blue-500" /> Online bookings & reminders
            </li>
          </ul>
          <a
            href="#plans"
            className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-green-500 via-blue-400 to-gray-400 text-white font-bold text-lg shadow-lg hover:scale-105 transition-transform duration-200"
          >
            Try Skilabot for Free
          </a>
        </div>
        {/* Right: Visual/Stats */}
        <div className="relative flex flex-col items-center justify-center">
          <div className="w-80 h-80 bg-gradient-to-br from-green-200 via-blue-100 to-gray-100 rounded-full flex items-center justify-center shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=400&fit=crop"
              alt="Condominium management illustration"
              className="w-60 h-60 object-cover rounded-full shadow-lg border-8 border-white"
            />
          </div>
          {/* Floating Metrics */}
          <div className="absolute -top-6 -left-8 bg-white rounded-2xl p-4 shadow-lg border border-green-100 animate-fade-in">
            <div className="text-xs text-gray-600 mb-1">Units Managed</div>
            <div className="text-green-600 font-bold text-lg">+1,500</div>
          </div>
          <div className="absolute -bottom-6 -right-8 bg-white rounded-2xl p-4 shadow-lg border border-blue-100 animate-fade-in">
            <div className="text-xs text-gray-600 mb-1">Resident Satisfaction</div>
            <div className="text-blue-500 font-bold text-lg">97%</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 