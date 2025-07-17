import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import React from "react";

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 bg-pink-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            What beauty professionals say about {" "}
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-yellow-400 bg-clip-text text-transparent">
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
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 2l2.39 7.26H22l-6.19 4.5L17.82 22 12 17.27 6.18 22l1.99-8.24L2 9.26h7.61z" fill="#e879f9"/></svg>
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
              <div className="text-gray-600 mb-1">Based on 2,980 reviews</div>
              <div className="text-xs text-gray-400">from verified <span className="font-semibold">Trustpilot</span> users</div>
            </CardContent>
          </Card>
        </div>
        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {[
            {
              name: "Sophia Turner",
              role: "Owner, Glamour Beauty Salon",
              photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face",
              quote: "Skilabot made it so easy to manage appointments and keep my clients happy!"
            },
            {
              name: "Carlos Mendes",
              role: "Barber, Urban Cuts",
              photo: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&h=100&fit=crop&crop=face",
              quote: "Automated reminders and feedback tools have boosted our client retention."
            },
            {
              name: "Emily Chen",
              role: "Stylist, Bella Chic",
              photo: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=100&h=100&fit=crop&crop=face",
              quote: "The analytics and loyalty programs help us grow our business every month."
            },
            {
              name: "Lucas Silva",
              role: "Manager, The Golden Razor",
              photo: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=100&h=100&fit=crop&crop=face",
              quote: "Skilabot is a must-have for any modern salon or barbershop!"
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