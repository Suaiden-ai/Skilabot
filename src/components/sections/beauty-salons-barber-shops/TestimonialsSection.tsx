import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import React from "react";

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 bg-white overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#343A40' }}>
            What beauty professionals say about <span style={{ color: '#FFD700' }}>Skilabot</span>
          </h2>
        </div>
        {/* Trustpilot Card */}
        <div className="text-center mb-12">
          <Card className="inline-block p-8 bg-white shadow-xl border border-[#F1F3F4]">
            <CardContent className="p-0">
              <div className="flex items-center justify-center gap-2 text-lg font-semibold mb-2" style={{ color: '#343A40' }}>
                <span>Trustpilot</span>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 2l2.39 7.26H22l-6.19 4.5L17.82 22 12 17.27 6.18 22l1.99-8.24L2 9.26h7.61z" fill="#FFD700"/></svg>
              </div>
              <div className="flex items-center justify-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className="w-6 h-6 text-[#FFD700] fill-current" 
                  />
                ))}
              </div>
              <div className="text-4xl font-bold mb-2" style={{ color: '#343A40' }}>4.9/5.0</div>
              <div className="mb-1" style={{ color: '#18181B' }}>Based on 2,980 reviews</div>
              <div className="text-xs" style={{ color: '#18181B' }}>from verified <span className="font-semibold">Trustpilot</span> users</div>
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
            <Card key={index} className="p-6 bg-white shadow-lg border border-[#F1F3F4] hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
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
                          className="w-4 h-4 text-[#FFD700] fill-current" 
                        />
                      ))}
                    </div>
                    <p className="mb-4 italic" style={{ color: '#18181B' }}>
                      "{testimonial.quote}"
                    </p>
                    <div>
                      <div className="font-bold" style={{ color: '#343A40' }}>{testimonial.name}</div>
                      <div className="text-sm" style={{ color: '#18181B' }}>{testimonial.role}</div>
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