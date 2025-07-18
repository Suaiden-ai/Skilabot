
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
    <section className="py-20 bg-gray-50 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
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
        <div className="text-center mb-12">
          <div className="inline-block p-8 bg-white shadow-xl border-0 rounded-2xl">
            <div className="flex items-center justify-center gap-2 text-lg font-semibold text-gray-800 mb-2">
              <span>Trustpilot</span>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 2l2.39 7.26H22l-6.19 4.5L17.82 22 12 17.27 6.18 22l1.99-8.24L2 9.26h7.61z" fill="#22c55e"/></svg>
            </div>
            <div className="flex items-center justify-center gap-2 mb-4">
              {[1, 2, 3, 4].map((star) => (
                <Star 
                  key={star} 
                  className="w-8 h-8 text-yellow-400 fill-current" 
                />
              ))}
              <Star className="w-8 h-8 text-gray-300" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">4.7/5.0</div>
            <div className="text-gray-600 mb-1">Based on 2,847 reviews</div>
            <div className="text-xs text-gray-400">from verified <span className="font-semibold">Trustpilot</span> users</div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
