
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import ChatbotSection from "@/components/sections/dealerships/ChatbotSection";
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

const PoliticalAgents = () => {
  const benefits = [
    {
      icon: Clock,
      title: "24/7 Responses",
      description: "Never miss an opportunity to connect with a voter again."
    },
    {
      icon: FileText,
      title: "Demand Collection",
      description: "Automatically register suggestions, complaints and compliments."
    },
    {
      icon: Megaphone,
      title: "Communication Dispatch",
      description: "Send messages to segmented audiences with ease."
    },
    {
      icon: Calendar,
      title: "Easy Scheduling",
      description: "Facilitate your base's participation in meetings or events."
    },
    {
      icon: BarChart3,
      title: "Engagement Reports",
      description: "Understand what matters to your audience."
    }
  ];

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
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white px-8"
                >
                  <Play className="w-5 h-5 mr-2" />
                  See how it works
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-indigo-500 text-indigo-600 hover:bg-indigo-50 px-8"
                >
                  Request a demo
                  <ArrowRight className="w-5 h-5 ml-2" />
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

      {/* Problem */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-900">
            Stop losing messages and sending cold automated replies
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Politicians receive hundreds of messages daily and can't give attention to everyone. 
            This compromises their image and weakens relationships with the public. Our chatbot 
            steps in to organize the chaos, respond with empathy and deliver 
            personalized answers in real time.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Benefits that transform your communication
            </h2>
            <p className="text-xl text-gray-600">
              Discover how our AI can revolutionize your relationship with voters
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-gray-600 text-base">
                    {benefit.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Chatbot Section */}
      <ChatbotSection />

      {/* Use Cases */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Real use cases
            </h2>
            <p className="text-xl text-gray-600">
              See how other politicians are using our solution
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Connected Candidate</h3>
                    <p className="text-gray-600">
                      John, city council candidate, uses the chatbot to answer questions about 
                      his government plan on WhatsApp — while his team takes care of the streets.
                    </p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 italic">
                    "I was able to respond to 300% more voters and still had time to focus on the campaign"
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Live Stream Engagement</h3>
                    <p className="text-gray-600">
                      During a live stream, the bot collects questions and sends links with detailed 
                      proposals automatically.
                    </p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 italic">
                    "My last live stream had 85% more engagement with automated responses"
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Complete features
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need for efficient political communication
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                <span className="text-lg text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-8">
            Watch how our chatbot transforms political communication in practice
          </h2>
          
          <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl p-12 shadow-2xl">
            <div className="flex flex-col items-center gap-6">
              <div className="w-24 h-24 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full flex items-center justify-center">
                <Play className="w-12 h-12 text-white ml-1" />
              </div>
              <p className="text-xl text-gray-300">
                Demo video will be embedded here
              </p>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600"
              >
                Watch demonstration
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Build a solid relationship with those who elect you
          </h2>
          <p className="text-xl mb-12 text-indigo-100">
            Join the politicians who are already transforming their communication with our AI
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
            >
              I want to test now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-indigo-600 px-8 py-4 text-lg font-semibold"
            >
              Talk to a specialist
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PoliticalAgents;
