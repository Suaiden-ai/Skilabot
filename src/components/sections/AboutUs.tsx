
import { Button } from "@/components/ui/button";
import { BarChart2, Lightbulb, Share2, User, Zap, Search, Brain } from "lucide-react";

const AboutUs = () => {
  const gradientText = {
    background: "linear-gradient(90deg, #F15A8A 0%, #F47B20 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    fontWeight: 600,
  };

  const gradientIcon = {
    background: "linear-gradient(90deg, #F15A8A 0%, #F47B20 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  };

  const gradientBadge = {
    background: "linear-gradient(90deg, #F15A8A 0%, #F47B20 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    fontWeight: 600,
    filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))",
  };

  const gradientSvgIcon = {
    background: "linear-gradient(90deg, #F15A8A 0%, #F47B20 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  };

  return (
    <section id="about" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col gap-24">
        {/* Section 1: For those who make it happen */}
        <div>
          <div className="flex flex-col items-center mb-10">
            <span className="text-sm font-semibold tracking-widest bg-gray-100 rounded px-3 py-1 mb-4 shadow-md" style={gradientBadge}>FOR THE GO-GETTERS</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">Skilabot is ideal for</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              {/* Card 1 */}
              <div className="bg-white rounded-xl shadow p-6 flex flex-col items-start gap-3 border border-gray-100">
                <Share2 className="w-8 h-8 mb-2" style={gradientIcon} />
                <span className="text-lg text-gray-900 font-medium">Agencies that want to <span style={gradientText}>sell automation</span> as a service to other companies</span>
                  </div>
              {/* Card 2 */}
              <div className="bg-white rounded-xl shadow p-6 flex flex-col items-start gap-3 border border-gray-100">
                <BarChart2 className="w-8 h-8 mb-2" style={gradientIcon} />
                <span className="text-lg text-gray-900 font-medium">Professionals looking to <span style={gradientText}>scale support and sales</span> in their company with AI Employees</span>
              </div>
              {/* Card 3 */}
              <div className="bg-white rounded-xl shadow p-6 flex flex-col items-start gap-3 border border-gray-100">
                <Lightbulb className="w-8 h-8 mb-2" style={gradientIcon} />
                <span className="text-lg text-gray-900 font-medium">Entrepreneurs who want to <span style={gradientText}>turn ideas into innovative products and services</span> with AI</span>
              </div>
            </div>
          </div>
        </div>
        {/* Section 2: What is an AI Employee? */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Phone image */}
          <div className="flex justify-center md:justify-end">
            <img 
              src="psd_isolate_smartphone_with_blank_screen_mockup_template.png"
              alt="AI Employee example"
              width="493"
              height="892"
              style={{
                display: 'block',
                width: '100%',
                height: '100%',
                borderRadius: 'inherit',
                objectPosition: 'center center',
                objectFit: 'contain',
                background: 'transparent',
                filter: 'drop-shadow(15px 10px 20px rgba(0, 0, 0, 0.4))',
                transform: 'translateX(50px)'
              }}
            />
          </div>
          {/* Content */}
          <div>
            {/* Badge */}
            <div className="mb-4">
              <div className="inline-flex items-center gap-2 bg-gray-100 rounded-md px-3 py-1 shadow-sm">
                <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                <span className="text-xs font-semibold tracking-widest text-gray-600">AI AGENTS</span>
              </div>
            </div>
            
            {/* Heading */}
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">What is an AI Employee?</h3>
            
            {/* Supporting text */}
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-xl leading-relaxed">
              <span className="font-bold text-gray-900">AI Employees</span> are like having your own company "ChatGPT". They understand and respond to customers, execute tasks, and work 24/7 for your business.
            </p>
            
            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Card 1 */}
              <div className="flex flex-col items-start gap-3">
                <div className="w-12 h-12 mb-2" style={gradientSvgIcon}>
                  <img src="/icons/management.svg" alt="Acts like a human" style={{ width: '100%', height: '100%' }} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-lg mb-2">Acts like a <span style={gradientText}>human</span></h4>
                  <p className="text-gray-700 text-base leading-relaxed">Transform your customer experience with natural, humanized service that is always available.</p>
                </div>
              </div>
              
              {/* Card 2 */}
              <div className="flex flex-col items-start gap-3">
                <div className="w-12 h-12 mb-2" style={gradientSvgIcon}>
                  <img src="/icons/robotic-process-automation.svg" alt="Automated tasks" style={{ width: '100%', height: '100%' }} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-lg mb-2">Performs <span style={gradientText}>automated</span> tasks</h4>
                  <p className="text-gray-700 text-base leading-relaxed">Let AI handle repetitive processes so your team can focus on what really matters.</p>
                </div>
              </div>
              
              {/* Card 3 */}
              <div className="flex flex-col items-start gap-3">
                <div className="w-12 h-12 mb-2" style={gradientSvgIcon}>
                  <img src="/icons/data.svg" alt="Real-time information" style={{ width: '100%', height: '100%' }} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-lg mb-2">Fetches <span style={gradientText}>real-time information</span></h4>
                  <p className="text-gray-700 text-base leading-relaxed">Respond to customers with speed and accuracy, with always up-to-date information about your company and products.</p>
                </div>
              </div>
              
              {/* Card 4 */}
              <div className="flex flex-col items-start gap-3">
                <div className="w-12 h-12 mb-2" style={gradientSvgIcon}>
                  <img src="/icons/decision-making.svg" alt="Decisions and solves problems" style={{ width: '100%', height: '100%' }} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-lg mb-2">Makes <span style={gradientText}>decisions and solves problems</span></h4>
                  <p className="text-gray-700 text-base leading-relaxed">AI that gets things done, solves problems without intervention, and increases efficiency.</p>
                </div>
              </div>
            </div>
            
            {/* Button */}
            <div className="flex justify-center">
              <a 
                href="#pricing" 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                style={{
                  boxShadow: "rgba(30, 7, 81, 0.12) 0px 4px 6px 0px"
                }}
              >
                <span className="text-lg">Create AI Employee</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 256 256" 
                  focusable="false" 
                  color="rgb(255, 255, 255)" 
                  style={{
                    userSelect: 'none',
                    width: '20px',
                    height: '20px',
                    display: 'inline-block',
                    fill: 'rgb(255, 255, 255)',
                    color: 'rgb(255, 255, 255)',
                    flexShrink: 0
                  }}
                >
                  <g color="rgb(255, 255, 255)">
                    <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path>
                  </g>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
