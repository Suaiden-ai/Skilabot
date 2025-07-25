import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import React from "react";

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 bg-white overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#7C3AED]">
            What psychologists & therapists say about <span className="text-[#43A047]">Skilabot</span>
          </h2>
        </div>
        {/* Trustpilot Card */}
        <div className="text-center mb-12">
          <Card className="inline-block p-8 bg-white shadow-xl border-0">
            <CardContent className="p-0">
              <div className="flex items-center justify-center gap-2 text-lg font-semibold text-[#7C3AED] mb-2">
                <span>Trustpilot</span>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 2l2.39 7.26H22l-6.19 4.5L17.82 22 12 17.27 6.18 22l1.99-8.24L2 9.26h7.61z" fill="#43A047"/></svg>
              </div>
              <div className="flex items-center justify-center gap-2 mb-4">
                {[1, 2, 3, 4].map((star) => (
                  <Star 
                    key={star} 
                    className="w-6 h-6 text-[#FFD700] fill-current" 
                  />
                ))}
                <Star className="w-6 h-6 text-[#E9D8FD]" />
              </div>
              <div className="text-4xl font-bold text-[#7C3AED] mb-2">4.9/5.0</div>
              <div className="text-[#23272F] mb-1">Based on 2,450 reviews</div>
              <div className="text-xs text-[#23272F]">from verified <span className="font-semibold">Trustpilot</span> users</div>
            </CardContent>
          </Card>
        </div>
        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {[
            {
              name: "Dr. Julia Evans",
              role: "Clinical Psychologist, Mindful Path",
              photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face",
              quote: "Skilabot has made it so much easier to keep my clients engaged and on track with their sessions."
            },
            {
              name: "Dr. Lucas Martins",
              role: "Therapist, Wellness Space",
              photo: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&h=100&fit=crop&crop=face",
              quote: "Automated reminders and secure messaging have improved my practice’s efficiency and client satisfaction."
            },
            {
              name: "Emily Chen",
              role: "Counselor, Harmony Therapy",
              photo: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=100&h=100&fit=crop&crop=face",
              quote: "The unified dashboard and analytics help me make better decisions for my clients every day."
            },
            {
              name: "Dr. Sofia Lee",
              role: "Child Psychologist, KidsCare",
              photo: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=100&h=100&fit=crop&crop=face",
              quote: "I love how easy it is to communicate securely with parents and send self-care tips automatically."
            }
          ].map((testimonial, index) => (
            <Card key={index} className="p-6 bg-white shadow-lg border-0 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-0">
                <div className="flex items-start gap-4">
                  <img 
                    src={testimonial.photo}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-[#7C3AED]"
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
                    <p className="text-[#23272F] mb-4 italic">"{testimonial.quote}"</p>
                    <div>
                      <div className="font-bold text-[#7C3AED]">{testimonial.name}</div>
                      <div className="text-sm text-[#23272F]">{testimonial.role}</div>
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