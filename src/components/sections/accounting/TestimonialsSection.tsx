import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import React from "react";

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 bg-white overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#23272F]">
            What small business owners say about <span className="text-[#23272F]">Skilabot</span>
          </h2>
        </div>
        {/* Trustpilot Card */}
        <div className="text-center mb-12">
          <Card className="inline-block p-8 bg-white shadow-xl border border-[#D1D5DB]">
            <CardContent className="p-0">
              <div className="flex items-center justify-center gap-2 text-lg font-semibold mb-2 text-[#23272F]">
                <span>Trustpilot</span>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 2l2.39 7.26H22l-6.19 4.5L17.82 22 12 17.27 6.18 22l1.99-8.24L2 9.26h7.61z" fill="#23272F"/></svg>
              </div>
              <div className="flex items-center justify-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className="w-6 h-6 text-[#FFD700] fill-current" 
                  />
                ))}
              </div>
              <div className="text-4xl font-bold mb-2 text-[#23272F]">4.9/5.0</div>
              <div className="mb-1 text-[#343A40]">Based on 1,850 reviews</div>
              <div className="text-xs text-[#343A40]">from verified <span className="font-semibold">Trustpilot</span> users</div>
            </CardContent>
          </Card>
        </div>
        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {[
            {
              name: "Emily Johnson",
              role: "Owner, Johnson Consulting LLC",
              photo: "https://randomuser.me/api/portraits/women/44.jpg",
              quote: "Skilabot made my tax season stress-free and keeps my books organized all year!"
            },
            {
              name: "Michael Lee",
              role: "Freelance Designer",
              photo: "https://randomuser.me/api/portraits/men/32.jpg",
              quote: "The invoicing and automated reports save me hours every month. Highly recommended!"
            },
            {
              name: "Sarah Williams",
              role: "Founder, Williams Bakery",
              photo: "https://randomuser.me/api/portraits/women/65.jpg",
              quote: "I love the dashboard and how easy it is to manage my business finances."
            },
            {
              name: "David Smith",
              role: "Co-owner, Smith & Sons Auto Repair",
              photo: "https://randomuser.me/api/portraits/men/41.jpg",
              quote: "Skilabot is a must-have for any small business that wants peace of mind with accounting!"
            }
          ].map((testimonial, index) => (
            <Card key={index} className="p-6 bg-white shadow-lg border border-[#D1D5DB] hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
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
                    <p className="mb-4 italic text-[#343A40]">
                      "{testimonial.quote}"
                    </p>
                    <div>
                      <div className="font-bold text-[#23272F]">{testimonial.name}</div>
                      <div className="text-sm text-[#343A40]">{testimonial.role}</div>
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