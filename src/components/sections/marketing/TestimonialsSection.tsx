
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Ana Costa",
      role: "Agência de Tráfego Local",
      photo: "https://images.unsplash.com/photo-1494790108755-2616b68e9413?w=100&h=100&fit=crop&crop=face",
      quote: "Minha taxa de conversão subiu 30% depois que passei a responder leads em segundos."
    },
    {
      name: "Ricardo Mendes",
      role: "Especialista em Performance",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      quote: "A ferramenta integra todos os canais de captação e centraliza no mesmo painel."
    },
    {
      name: "Juliana Santos",
      role: "Head de Growth Marketing",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      quote: "O ROI das campanhas melhorou drasticamente com a nutrição automática de leads."
    },
    {
      name: "Paulo Ferreira",
      role: "Gestor de Tráfego Pago",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      quote: "Economia de 5 horas por dia no follow-up manual. Agora foco só na estratégia."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            O que as agências de marketing dizem sobre o{" "}
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Chat Inteligente
            </span>
          </h2>
        </div>

        {/* Avaliação em Destaque */}
        <div className="text-center mb-12">
          <Card className="inline-block p-8 bg-white shadow-xl border-0">
            <CardContent className="p-0">
              <div className="flex items-center justify-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className={`w-6 h-6 ${star <= 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">4.7/5.0</div>
              <div className="text-gray-600">Baseado em 1824 avaliações</div>
            </CardContent>
          </Card>
        </div>

        {/* Grid de Testemunhos */}
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
            Ver casos reais
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
