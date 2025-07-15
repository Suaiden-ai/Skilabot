
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
          <Card className="bg-white border-0 shadow-lg max-w-md mx-auto">
            <CardContent className="p-8">
              <div className="flex items-center justify-center gap-2 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className={`w-6 h-6 ${star <= 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                ))}
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">4.7/5.0</div>
              <p className="text-gray-600">Based on 3265 reviews</p>
            </CardContent>
          </Card>

          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            View real cases
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
