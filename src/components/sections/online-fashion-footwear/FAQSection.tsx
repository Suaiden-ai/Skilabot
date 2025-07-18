import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "How can AI increase my fashion/footwear sales?",
      answer: "AI recommends products, sends personalized promotions, and recovers abandoned carts automatically, increasing your store's conversion and average ticket."
    },
    {
      question: "Can I automate customer service via WhatsApp?",
      answer: "Yes! The chatbot answers questions, sends order status, suggests outfits, and makes sales 24/7, with no need for a dedicated team."
    },
    {
      question: "Does the platform integrate with my inventory and marketplaces?",
      answer: "Yes, you can integrate your inventory and manage sales across multiple channels like Shopee, Mercado Livre, and others, all in one dashboard."
    },
    {
      question: "Can I send segmented promotions to my customers?",
      answer: "Yes! AI segments your base by profile, purchase history, and preferences, sending automatic offers and coupons to each group."
    },
    {
      question: "Is it possible to track campaign performance?",
      answer: "You track sales, engagement, conversion metrics, and can adjust campaigns in real time through the management dashboard."
    },
    {
      question: "How does the free trial work?",
      answer: "You can test all features for 7 days, no credit card required, and with dedicated support to answer questions and set up your store." 
    }
  ];

  return (
    <section id="faq-section" className="py-20 bg-white overflow-x-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
              Frequently Asked Questions
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            Get your questions answered about our solution for online fashion and footwear
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-green-600 transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <div className="text-center mt-12">
        <p className="text-gray-600 mb-6">Still have questions? Contact us!</p>
        <div className="flex gap-4 justify-center">
          <a 
            href="https://wa.me/5511999999999" 
            className="inline-flex items-center px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors duration-300"
            target="_blank" 
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
          <a 
            href="mailto:contact@yourfashion.com" 
            className="inline-flex items-center px-6 py-3 border-2 border-green-500 text-green-600 font-semibold rounded-lg hover:bg-green-50 transition-colors duration-300"
          >
            Email
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection; 