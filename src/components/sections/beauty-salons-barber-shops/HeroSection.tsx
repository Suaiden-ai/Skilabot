import { Sparkles, Scissors, Smile, CalendarCheck2 } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative bg-white py-20 overflow-x-hidden">image.png
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left: Content */}
        <div className="space-y-8 w-full max-w-md mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4" style={{ color: '#343A40' }}>
            Transform Your Beauty Salon or Barber Shop with <span style={{ color: '#FFD700' }}>Skilabot</span>
          </h1>
          <p className="text-lg md:text-xl mb-6" style={{ color: '#18181B' }}>
            Automate bookings, delight your clients, and grow your business with smart tools designed for beauty professionals.
          </p>
          <ul className="space-y-3 mb-8">
            <li className="flex items-center gap-3 font-medium" style={{ color: '#18181B' }}>
              <Sparkles className="w-5 h-5" style={{ color: '#FFD700' }} /> Personalized client experience
            </li>
            <li className="flex items-center gap-3 font-medium" style={{ color: '#18181B' }}>
              <CalendarCheck2 className="w-5 h-5" style={{ color: '#343A40' }} /> Online booking & reminders
            </li>
            <li className="flex items-center gap-3 font-medium" style={{ color: '#18181B' }}>
              <Scissors className="w-5 h-5" style={{ color: '#343A40' }} /> Staff & schedule management
            </li>
            <li className="flex items-center gap-3 font-medium" style={{ color: '#18181B' }}>
              <Smile className="w-5 h-5" style={{ color: '#FFD700' }} /> Loyalty & feedback tools
            </li>
          </ul>
          <a
            href="#plans"
            className="inline-block px-8 py-4 rounded-full bg-[#343A40] text-white font-bold text-lg shadow-lg hover:scale-105 transition-transform duration-200 border border-[#343A40]"
          >
            Try Skilabot for Free
          </a>
        </div>
        {/* Right: Visual/Stats */}
        <div className="relative flex flex-col items-center justify-center">
          <div className="w-80 h-80 bg-[#F1F3F4] rounded-full flex items-center justify-center shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop"
              alt="Beauty salon illustration"
              className="w-60 h-60 object-cover rounded-full shadow-lg border-8 border-white"
            />
          </div>
          {/* Floating Metrics */}
          <div className="absolute -top-6 -left-8 bg-white rounded-2xl p-4 shadow-lg border border-[#343A40] animate-fade-in">
            <div className="text-xs mb-1" style={{ color: '#18181B' }}>Monthly Bookings</div>
            <div className="font-bold text-lg" style={{ color: '#343A40' }}>+2,500</div>
          </div>
          <div className="absolute -bottom-6 -right-8 bg-white rounded-2xl p-4 shadow-lg border border-[#FFD700] animate-fade-in">
            <div className="text-xs mb-1" style={{ color: '#18181B' }}>Client Satisfaction</div>
            <div className="font-bold text-lg" style={{ color: '#FFD700' }}>98%</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 