import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import React from "react";

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 bg-yellow-50 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            What restaurant & delivery owners say about {" "}
            <span className="bg-gradient-to-r from-red-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Skilabot
            </span>
          </h2>
        </div>
        {/* Trustpilot Card */}
        <div className="text-center mb-12">
          <Card className="inline-block p-8 bg-white shadow-xl border-0">
            <CardContent className="p-0">
              <div className="flex items-center justify-center gap-2 text-lg font-semibold text-gray-800 mb-2">
                <span>Trustpilot</span>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 2l2.39 7.26H22l-6.19 4.5L17.82 22 12 17.27 6.18 22l1.99-8.24L2 9.26h7.61z" fill="#f59e42"/></svg>
              </div>
              <div className="flex items-center justify-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className="w-6 h-6 text-yellow-400 fill-current" 
                  />
                ))}
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">4.9/5.0</div>
              <div className="text-gray-600 mb-1">Based on 3,120 reviews</div>
              <div className="text-xs text-gray-400">from verified <span className="font-semibold">Trustpilot</span> users</div>
            </CardContent>
          </Card>
        </div>
        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {[
            {
              name: "Maria Gomez",
              role: "Owner, La Fiesta Grill",
              photo: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=100&h=100&fit=crop&crop=face",
              quote: "Skilabot has transformed our delivery process—orders are faster and customers are happier than ever!"
            },
            {
              name: "James Lee",
              role: "Manager, Urban Eats Delivery",
              photo: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&h=100&fit=crop&crop=face",
              quote: "The automated notifications and real-time tracking have made our operations so much smoother."
            },
            {
              name: "Priya Patel",
              role: "Owner, Curry Express",
              photo: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=100&h=100&fit=crop&crop=face",
              quote: "We love the analytics and customer feedback tools—they help us improve every week."
            },
            {
              name: "Lucas Silva",
              role: "Chef, Bella Pizza",
              photo: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=100&h=100&fit=crop&crop=face",
              quote: "Skilabot makes it easy to manage orders and keep our customers coming back!"
            }
          ].map((testimonial, index) => (
            <Card key={index} className="p-6 bg-white shadow-lg border-0 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-0">
                <div className="flex items-start gap-4">
                  <img 
                    src={testimonial.photo}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className="w-4 h-4 text-yellow-400 fill-current" 
                        />
                      ))}
                    </div>
                    <p className="text-gray-800 mb-4 italic">"{testimonial.quote}"</p>
                    <div>
                      <div className="font-bold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 