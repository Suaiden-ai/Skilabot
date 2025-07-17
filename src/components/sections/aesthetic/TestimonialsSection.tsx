
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Dr. Mariana Santos",
      role: "Advanced Aesthetician",
      image: "https://images.unsplash.com/photo-1594824804563-48a019bb25d5?w=120&h=120&fit=crop&crop=face",
      quote: "I reduced no-shows by 35% since I started sending automatic confirmation reminders. My schedule is always optimized!"
    },
    {
      name: "Carla Mendes",
      role: "Clinic Owner",
      image: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=120&h=120&fit=crop&crop=face",
      quote: "The system revolutionized my management. I can track all procedures and client satisfaction in real time."
    },
    {
      name: "Ana Beatriz",
      role: "Cryolipolysis Specialist",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=120&h=120&fit=crop&crop=face",
      quote: "The AI answers basic client questions instantly, giving me more time to focus on treatments."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What{" "}
            <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
              aesthetic clinics
            </span>
            <br />
            say about Skilabot
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
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-700 leading-relaxed italic">
                  "{testimonial.quote}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center space-y-8">
          <div className="inline-block p-8 bg-white shadow-xl border-0 rounded-2xl">
            <div className="flex items-center justify-center gap-2 text-lg font-semibold text-gray-800 mb-2">
              <span>Trustpilot</span>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 2l2.39 7.26H22l-6.19 4.5L17.82 22 12 17.27 6.18 22l1.99-8.24L2 9.26h7.61z" fill="#22c55e"/></svg>
            </div>
            <div className="flex items-center justify-center gap-2 mb-4">
              {[1, 2, 3, 4].map((star) => (
                <Star 
                  key={star} 
                  className="w-6 h-6 text-yellow-400 fill-current" 
                />
              ))}
              <Star className="w-6 h-6 text-gray-300" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">4.7/5.0</div>
            <div className="text-gray-600 mb-1">Based on 2,847 reviews</div>
            <div className="text-xs text-gray-400">from verified <span className="font-semibold">Trustpilot</span> users</div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
