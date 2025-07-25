import { ShieldCheck, FileText, BarChart2, CalendarCheck2 } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative bg-[#F8F9FA] py-20 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left: Content */}
        <div className="space-y-8 w-full max-w-md mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-[#23272F]">
            Digital Accounting for Small Businesses
          </h1>
          <p className="text-lg md:text-xl mb-6 text-[#343A40]">
            Automate your tax filings, manage invoices, and get expert support. Focus on growing your business while we simplify your accounting.
          </p>
          <ul className="space-y-3 mb-8">
            <li className="flex items-center gap-3 font-medium text-[#343A40]">
              <ShieldCheck className="w-5 h-5 text-[#23272F]" /> Secure, compliant, and cloud-based
            </li>
            <li className="flex items-center gap-3 font-medium text-[#343A40]">
              <FileText className="w-5 h-5 text-[#23272F]" /> Automated tax calculation & filing
            </li>
            <li className="flex items-center gap-3 font-medium text-[#343A40]">
              <BarChart2 className="w-5 h-5 text-[#23272F]" /> Real-time financial reports & dashboards
            </li>
            <li className="flex items-center gap-3 font-medium text-[#343A40]">
              <CalendarCheck2 className="w-5 h-5 text-[#23272F]" /> Dedicated support for your business
            </li>
          </ul>
          <a
            href="#plans"
            className="inline-block px-8 py-4 rounded-full bg-[#23272F] text-white font-bold text-lg shadow hover:scale-105 transition-transform duration-200 border border-[#23272F]"
          >
            Try Skilabot for Free
          </a>
        </div>
        {/* Right: Visual/Stats */}
        <div className="relative flex flex-col items-center justify-center">
          <div className="w-80 h-80 bg-[#F1F3F4] rounded-full flex items-center justify-center shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1515168833906-d2a3b82b302b?w=400&h=400&fit=crop"
              alt="Accounting illustration"
              className="w-60 h-60 object-cover rounded-full shadow-lg border-8 border-white"
            />
          </div>
          {/* Floating Metrics */}
          <div className="absolute -top-6 -left-8 bg-white rounded-2xl p-4 shadow-lg border border-[#D1D5DB] animate-fade-in">
            <div className="text-xs mb-1 text-[#343A40]">Tax Filings Processed</div>
            <div className="font-bold text-lg text-[#23272F]">+2,500</div>
          </div>
          <div className="absolute -bottom-6 -right-8 bg-white rounded-2xl p-4 shadow-lg border border-[#D1D5DB] animate-fade-in">
            <div className="text-xs mb-1 text-[#343A40]">Client Satisfaction</div>
            <div className="font-bold text-lg text-[#23272F]">99%</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 