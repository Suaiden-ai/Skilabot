import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Maria Oliveira",
    role: "City Councilor",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    quote: "With the AI chatbot, I respond to more voters and build stronger relationships."
  },
  {
    name: "João Silva",
    role: "Campaign Manager",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    quote: "The platform organizes all demands and makes communication much more efficient."
  },
  {
    name: "Ana Paula",
    role: "Political Advisor",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    quote: "I can segment messages and keep my base always informed."
  }
];

const TestimonialsSection = () => (
  <section className="py-20 bg-white overflow-x-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">
          What <span className="text-[#C62828]">political agents</span> say about Skilabot
        </h2>
      </div>
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#183153]"
                />
                <div>
                  <h4 className="font-bold text-black">{testimonial.name}</h4>
                  <p className="text-sm text-black">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 text-[#FFC107] fill-current" />
                ))}
              </div>
              <p className="text-black leading-relaxed italic">
                "{testimonial.quote}"
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex justify-center">
        <div className="inline-block p-8 bg-white shadow-xl border-0 rounded-2xl">
          <div className="flex items-center justify-center gap-2 text-lg font-semibold text-black mb-2">
            <span>Trustpilot</span>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 2l2.39 7.26H22l-6.19 4.5L17.82 22 12 17.27 6.18 22l1.99-8.24L2 9.26h7.61z" fill="#183153"/></svg>
          </div>
          <div className="flex items-center justify-center gap-2 mb-4">
            {[1, 2, 3, 4].map((star) => (
              <Star 
                key={star} 
                className="w-6 h-6 text-[#FFC107] fill-current" 
              />
            ))}
            <Star className="w-6 h-6 text-[#E3E6F0]" />
          </div>
          <div className="text-3xl font-bold text-black mb-1">4.7/5.0</div>
          <div className="text-black mb-1">Based on 2,847 reviews</div>
          <div className="text-xs text-black">from verified <span className="font-semibold">Trustpilot</span> users</div>
        </div>
      </div>
    </div>
  </section>
);

export default TestimonialsSection; 