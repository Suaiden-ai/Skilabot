import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";

const faqs = [
  {
    question: "What is Skilabot?",
    answer: "Skilabot is an AI-powered platform that automates customer service, lead conversion, and engagement across multiple channels such as WhatsApp, Instagram, and Webchat."
  },
  {
    question: "How does Skilabot use Artificial Intelligence?",
    answer: "Our platform uses advanced conversational AI to understand, respond, and automate customer interactions, providing personalized and efficient support 24/7."
  },
  {
    question: "Which channels does Skilabot support?",
    answer: "Skilabot integrates with WhatsApp, Instagram, Webchat, and can be extended to other channels via API."
  },
  {
    question: "Can I integrate Skilabot with my existing systems?",
    answer: "Yes! Skilabot offers native integrations and APIs to connect with CRMs, ERPs, payment gateways, and other business tools."
  },
  {
    question: "Is my data secure with Skilabot?",
    answer: "Absolutely. We follow best practices in data security and comply with privacy regulations such as LGPD and GDPR."
  },
  {
    question: "What support does Skilabot offer?",
    answer: "We provide dedicated onboarding, live chat support, and a knowledge base to help you get the most out of the platform."
  },
  {
    question: "How do Skilabot's plans work?",
    answer: "We offer flexible plans based on your business size and needs. You can start with a free trial and upgrade as you grow."
  },
  {
    question: "Can I customize the AI responses?",
    answer: "Yes! You can fully customize the tone, style, and content of the AI responses to match your brand and business processes."
  },
  {
    question: "How do I get started?",
    answer: "Just sign up for a free trial, and our team will guide you through the setup and customization process."
  }
];

export default function FAQ() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-white to-gray-50">
      <Header />
      <main className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-10 md:p-14">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-gray-900 text-center tracking-tight">
            <span className="bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">Frequently Asked Questions</span>
          </h1>
          <div className="space-y-8">
            {faqs.map((faq, idx) => (
              <div key={idx}>
                <h2 className="text-xl font-semibold mb-2 text-gray-900">{faq.question}</h2>
                <p className="text-gray-600 text-base">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 