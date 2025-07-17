
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import DealershipsPlansSection from "@/components/sections/dealerships/PlansSection";
import ExpertiseSectionPolitical from "@/components/sections/political/ExpertiseSectionPolitical";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  MessageCircle, 
  Calendar, 
  FileText, 
  Clock, 
  BarChart3, 
  Megaphone, 
  MapPin,
  CheckCircle,
  Play,
  ArrowRight,
  Zap
} from "lucide-react";
import FAQSection from "@/components/sections/political/FAQSection";
import TestimonialsSection from "@/components/sections/political/TestimonialsSection";
import BenefitsSection from "@/components/sections/political/BenefitsSection";
import MetricsSection from "@/components/sections/political/MetricsSection";

const PoliticalAgents = () => {
  const features = [
    "AI with natural language",
    "Integration with WhatsApp, Instagram and Facebook",
    "Dashboard with conversation history",
    "Filters by location or interests",
    "Automated reminder sending"
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-20 bg-gradient-to-br from-indigo-50 via-white to-pink-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200">
                <Users className="w-4 h-4 mr-2" />
                For Political Agents
              </Badge>
              
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  The New Era of{" "}
                  <span className="bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
                    Political Communication
                  </span>
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed">
                  An AI chatbot that responds to voters, organizes demands 
                  and keeps your base informed — 24h a day, directly on WhatsApp, Instagram and Facebook.
                </p>
              </div>
              
              <div className="flex gap-4">
                <Button className="h-12 px-8 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105">
                  Try Free
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-indigo-100 to-pink-100 rounded-3xl p-8 shadow-xl">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Political Chatbot</p>
                      <p className="text-sm text-green-500">● Online</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-gray-100 rounded-lg p-3 text-sm">
                      "Hello! How can I help with your questions about the proposals?"
                    </div>
                    <div className="bg-indigo-500 text-white rounded-lg p-3 text-sm ml-8">
                      "I'd like to know about healthcare"
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3 text-sm">
                      "Great question! Our healthcare proposal includes..."
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <MetricsSection />

      <BenefitsSection />

      <ExpertiseSectionPolitical />

      <DealershipsPlansSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* FAQ Section */}
      <FAQSection />

      <Footer />
    </div>
  );
};

export default PoliticalAgents;
