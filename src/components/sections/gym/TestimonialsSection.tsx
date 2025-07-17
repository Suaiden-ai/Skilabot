
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Carlos Silva",
      role: "Personal Trainer",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      quote: "AI completely changed how I work. Now I can serve 3x more clients without losing quality."
    },
    {
      name: "Marina Santos",
      role: "Owner - Fitness Pro Gym",
      photo: "https://images.unsplash.com/photo-1494790108755-2616b68e9413?w=100&h=100&fit=crop&crop=face",
      quote: "In 3 months, our member retention increased 45%. The system is incredible for maintaining engagement."
    },
    {
      name: "Roberto Lima",
      role: "Fitness Coach",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      quote: "Automatic scheduling saved me more than 10 hours per week. Now I focus on what really matters."
    },
    {
      name: "Ana Oliveira",
      role: "Sports Nutritionist",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      quote: "My clients love the 24/7 support. I feel like I'm always present in their journey."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            What fitness professionals say about{" "}
            <span className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
              Skilabot
            </span>
          </h2>
        </div>

        {/* Rating Highlight */}
        <div className="text-center mb-12">
          <Card className="inline-block p-8 bg-white shadow-xl border-0 relative">
            <CardContent className="p-0">
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
              <div className="text-4xl font-bold text-gray-900 mb-2">4.7/5.0</div>
              <div className="text-gray-600 mb-1">Based on 2,847 reviews</div>
              <div className="text-xs text-gray-400">from verified <span className="font-semibold">Trustpilot</span> users</div>
            </CardContent>
          </Card>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
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

        <div className="text-center">
          <Button className="h-12 px-8 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105">
            See real cases
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
