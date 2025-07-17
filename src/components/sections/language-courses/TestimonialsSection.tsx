import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Prof. Ana Martins",
      role: "English Teacher",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      quote: "The AI reminders reduced missed classes by 30%. My students love the flexibility and I save hours every week!"
    },
    {
      name: "Carlos Eduardo",
      role: "Student",
      image: "https://randomuser.me/api/portraits/men/43.jpg",
      quote: "Scheduling and confirming my classes via WhatsApp is super easy. I always get reminders and never miss a lesson!"
    },
    {
      name: "Julia Souza",
      role: "School Manager",
      image: "https://randomuser.me/api/portraits/women/55.jpg",
      quote: "I can track all classes and student satisfaction in real time. The system made our management much more efficient."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What <span className="bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">language schools</span> say about Skilabot
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
        <div className="flex justify-center">
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