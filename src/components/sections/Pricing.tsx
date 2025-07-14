
import { Button } from "@/components/ui/button";
import { Check, Quote, FileText, Shield, Zap, Languages, Sparkles } from "lucide-react";

const Pricing = () => {
  const premiumTools = [
    { name: "Paraphraser", icon: Quote, color: "text-pink-500" },
    { name: "Grammar Checker", icon: FileText, color: "text-purple-500" },
    { name: "AI Detector", icon: Shield, color: "text-pink-500" },
    { name: "Summarizer", icon: Zap, color: "text-purple-500" },
    { name: "Translator", icon: Languages, color: "text-pink-500" },
    { name: "AI Flow", icon: Sparkles, color: "text-purple-500" }
  ];

  return (
    <section className="py-20 px-6 bg-pink-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-pink-400 text-sm uppercase tracking-wider mb-4">Smart Chat PRICING</p>
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Empower your chatting
          </h2>
          <h2 className="text-5xl font-bold mb-8">
            with <span className="text-pink-500">Premium</span>
          </h2>
          <p className="text-gray-600 mb-12">All premium plans include:</p>
        </div>

        {/* Premium Tools */}
        <div className="flex flex-wrap justify-center gap-6 mb-16">
          {premiumTools.map((tool, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center">
                <tool.icon className={`w-8 h-8 ${tool.color}`} />
              </div>
              <span className="text-sm font-medium text-gray-700">{tool.name}</span>
            </div>
          ))}
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Basic Plan */}
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-pink-200">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-1">Basic</h3>
              <p className="text-pink-400 text-sm mb-4">No credit card required</p>
              <div className="mb-4">
                <span className="text-4xl font-bold text-gray-900">$0</span>
                <span className="text-gray-600 ml-2">USD / per month</span>
              </div>
              <Button className="w-full bg-pink-500 hover:bg-pink-600 text-white rounded-full py-3 mb-4">
                Sign up for free
              </Button>
              <p className="text-sm text-gray-600 mb-6">Fix errors, strengthen your work and get help brainstorming</p>
            </div>
            
            <hr className="border-pink-200 mb-6" />
            
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-pink-500" />
                <span className="text-gray-700">1,000 monthly interactions</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-pink-500" />
                <span className="text-gray-700">Basic automated responses</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-pink-500" />
                <span className="text-gray-700">Integration messaging platform</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-pink-500" />
                <span className="text-gray-700">Customizable chatbot personality</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-pink-500" />
                <span className="text-gray-700">Standard reporting and analytics</span>
              </li>
            </ul>
          </div>

          {/* Premium Plan */}
          <div className="bg-gradient-to-br from-orange-400 to-pink-500 rounded-3xl p-8 shadow-2xl text-white">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-1">Premium</h3>
              <p className="text-white/80 text-sm mb-4">3-day money-back guarantee</p>
              <div className="mb-4">
                <span className="text-4xl font-bold">$09</span>
                <span className="text-white/80 ml-2">USD / per month, billed annually</span>
              </div>
              <Button className="w-full bg-white text-pink-500 hover:bg-gray-100 font-semibold rounded-full py-3 mb-4">
                Sign up for free
              </Button>
              <p className="text-sm text-white/80 mb-6">Feel confident your writing is clear, impactful and flawless</p>
            </div>
            
            <hr className="border-white/20 mb-6" />
            
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-white" />
                <span>1,000 monthly interactions</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-white" />
                <span>Basic automated responses</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-white" />
                <span>Integration messaging platform</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-white" />
                <span>Customizable chatbot personality</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-white" />
                <span>Standard reporting and analytics</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
