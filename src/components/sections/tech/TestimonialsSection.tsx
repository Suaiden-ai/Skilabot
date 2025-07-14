
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Carlos Silva",
      role: "IT Technician",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      quote: "Automatic status updates reduced customer calls by 80%. We greatly improved our workflow."
    },
    {
      name: "Ana Souza",
      role: "Workshop Owner",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b2ad?w=100&h=100&fit=crop&crop=face",
      quote: "The photo diagnostic system revolutionized our triage. We can estimate problems before the customer even arrives."
    },
    {
      name: "Roberto Costa",
      role: "TV and Audio Support",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face",
      quote: "The integration with our service order system was perfect. We didn't have to change our routine, just improved it."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">technical support services</span> say
          </h2>
          <p className="text-xl text-gray-600">
            Discover how our customers transformed their businesses
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <p className="text-gray-700 leading-relaxed italic">
                "{testimonial.quote}"
              </p>
            </div>
          ))}
        </div>

        {/* Rating Card */}
        <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg text-center mb-8">
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-8 h-8 text-yellow-400 fill-current" />
            ))}
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">4.7/5.0</div>
          <p className="text-gray-600">Based on 2541 reviews</p>
        </div>

        <div className="text-center">
          <Button className="h-12 px-8 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold rounded-lg">
            View real cases
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
