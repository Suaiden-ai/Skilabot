
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState(0);

  const faqs = [
    {
      question: "Can I customize responses according to vehicle models?",
      answer: "Yes! The system allows creating customized responses for each model, including technical sheets, prices, availability and even comparisons between models. AI learns about your inventory and can answer specific questions automatically."
    },
    {
      question: "How does integration with other dealership CRMs work?",
      answer: "Our platform integrates natively with major DMS (Dealer Management Systems) in the market, including CDK, Reynolds, AutoTrader and national systems. Synchronization is automatic and bidirectional, keeping all data updated in real time."
    },
    {
      question: "Is it possible to generate quotes and send financing documents?",
      answer: "Absolutely! The system generates financing quotes by consulting multiple partner banks, presents the best options and can send PDF documents directly through WhatsApp. It also includes consortium and leasing simulation."
    },
    {
      question: "How does test drive scheduling work?",
      answer: "The customer can schedule test drives directly in the chat, choosing available date and time. The system checks salespeople's schedules, vehicle availability and sends automatic reminders. Everything synchronized with your management system."
    },
    {
      question: "Does the system work for used car sales too?",
      answer: "Yes! In addition to new vehicles, the system manages the entire used car process, including trade-in evaluation via chat, with the customer sending photos and information of the current vehicle for automatic pre-evaluation."
    },
    {
      question: "What's the implementation time?",
      answer: "Basic implementation takes 24 to 48 hours. This includes initial configuration, integration with your existing systems, AI training with your information and team training. Complete support throughout the process."
    }
  ];

  return (
    <section id="faq-section" className="py-20 bg-white overflow-x-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-xl text-gray-600 text-center mb-12">
          Answers to the main questions about dealership automation
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setOpenFAQ(openFAQ === index ? -1 : index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
              >
                <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                {openFAQ === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                )}
              </button>
              {openFAQ === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
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
            href="mailto:contact@smartchat.com" 
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
