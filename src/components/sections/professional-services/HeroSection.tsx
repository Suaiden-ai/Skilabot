import { Briefcase, ShieldCheck, BarChart2, CalendarCheck2 } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative bg-white py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left: Content */}
        <div className="space-y-8">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4" style={{ color: '#0D47A1' }}>
            Elevate Your Professional Services with <span style={{ color: '#43A047' }}>Skilabot</span>
          </h1>
          <p className="text-lg md:text-xl mb-6" style={{ color: '#23272F' }}>
            Automate scheduling, streamline client management, and grow your business with smart tools for consultants, lawyers, architects, and more.
          </p>
          <ul className="space-y-3 mb-8">
            <li className="flex items-center gap-3 font-medium" style={{ color: '#23272F' }}>
              <Briefcase className="w-5 h-5" style={{ color: '#0D47A1' }} /> Professional client experience
            </li>
            <li className="flex items-center gap-3 font-medium" style={{ color: '#23272F' }}>
              <CalendarCheck2 className="w-5 h-5" style={{ color: '#43A047' }} /> Online booking & reminders
            </li>
            <li className="flex items-center gap-3 font-medium" style={{ color: '#23272F' }}>
              <ShieldCheck className="w-5 h-5" style={{ color: '#0D47A1' }} /> Secure document management
            </li>
            <li className="flex items-center gap-3 font-medium" style={{ color: '#23272F' }}>
              <BarChart2 className="w-5 h-5" style={{ color: '#43A047' }} /> Real-time analytics & insights
            </li>
          </ul>
          <a
            href="#plans"
            className="inline-block px-8 py-4 rounded-full bg-[#0D47A1] text-white font-bold text-lg shadow-lg hover:scale-105 transition-transform duration-200 border border-[#0D47A1]"
          >
            Try Skilabot for Free
          </a>
        </div>
        {/* Right: Visual/Stats */}
        <div className="relative flex flex-col items-center justify-center">
          <div className="w-80 h-80 bg-[#F1F3F4] rounded-full flex items-center justify-center shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=400&fit=crop"
              alt="Professional services illustration"
              className="w-60 h-60 object-cover rounded-full shadow-lg border-8 border-white"
            />
          </div>
          {/* Floating Metrics */}
          <div className="absolute -top-6 -left-8 bg-white rounded-2xl p-4 shadow-lg border border-[#0D47A1] animate-fade-in">
            <div className="text-xs mb-1" style={{ color: '#23272F' }}>Projects Managed</div>
            <div className="font-bold text-lg" style={{ color: '#0D47A1' }}>+3,000</div>
          </div>
          <div className="absolute -bottom-6 -right-8 bg-white rounded-2xl p-4 shadow-lg border border-[#43A047] animate-fade-in">
            <div className="text-xs mb-1" style={{ color: '#23272F' }}>Client Satisfaction</div>
            <div className="font-bold text-lg" style={{ color: '#43A047' }}>98%</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 