import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Maria Silva",
      role: "Senior Salesperson",
      company: "Chevrolet Prime",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      text: "Automatic test drive scheduling and WhatsApp follow-up doubled our sales in 3 months. AI really understands the customer!",
      rating: 5
    },
    {
      name: "Carlos Roberto",
      role: "Dealership Director",
      company: "Ford Excellence",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      text: "The integration with our DMS was perfect. Now we have complete visibility of the sales funnel and leads don't slip away anymore.",
      rating: 5
    },
    {
      name: "Ana Beatriz",
      role: "Sales Manager",
      company: "Volkswagen Center",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      text: "Instant financing quotes speed up the process so much. The customer makes decisions on the spot. Fantastic!",
      rating: 5
    },
    {
      name: "Roberto Lima",
      role: "Lead Salesperson",
      company: "Toyota Premium",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      text: "My productivity tripled. AI handles follow-up and I focus on closing. Result: 40% more sales!",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-white overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-4xl font-bold text-center text-[#23272F] mb-4">
          What dealerships say about Skilabot
        </h2>
        <p className="text-xl text-[#343A40] text-center mb-12">
          More than 1000 dealerships have already transformed their sales
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl border border-[#E3E6F0] shadow-sm p-5 flex flex-col gap-3 max-w-xs mx-auto">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img src={testimonial.image} alt={testimonial.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <div className="font-bold text-[#23272F]">{testimonial.name}</div>
                    <div className="text-xs text-[#343A40]">3 hours ago</div>
                  </div>
                </div>
                {/* Trustpilot star SVG */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6"><path d="M12 2L14.4721 8.30558L21.3137 8.76336L15.6569 13.1944L17.4721 20.2366L12 16.3056L6.52786 20.2366L8.34315 13.1944L2.68629 8.76336L9.52786 8.30558L12 2Z" fill="#FFC107"/></svg>
              </div>
              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#FFC107] fill-current" />
                ))}
              </div>
              {/* Review text */}
              <div className="text-[#343A40] text-sm line-clamp-3">
                {testimonial.text}
              </div>
              {/* Read more */}
              <div className="font-bold text-sm text-[#23272F] cursor-pointer">Read more</div>
            </div>
          ))}
        </div>

        {/* Overall Rating Card */}
        <div className="bg-white rounded-xl border border-[#E3E6F0] shadow-sm p-5 flex flex-col gap-3 max-w-xs mx-auto mb-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <div className="font-bold text-[#23272F] text-lg">Trustpilot</div>
            {/* Trustpilot star SVG */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6"><path d="M12 2L14.4721 8.30558L21.3137 8.76336L15.6569 13.1944L17.4721 20.2366L12 16.3056L6.52786 20.2366L8.34315 13.1944L2.68629 8.76336L9.52786 8.30558L12 2Z" fill="#FFC107"/></svg>
          </div>
          <div className="text-4xl font-bold text-[#23272F] mb-2">4.7/5.0</div>
          <div className="flex justify-center mb-2 gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-5 h-5 ${i < 4 ? 'text-[#FFC107] fill-current' : 'text-[#E3E6F0]'}`} />
            ))}
          </div>
          <p className="text-[#343A40] mb-1 text-center text-sm">Based on 2,847 reviews</p>
          <p className="text-xs text-[#343A40] text-center">from verified <span className="font-bold">Trustpilot</span> users</p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
