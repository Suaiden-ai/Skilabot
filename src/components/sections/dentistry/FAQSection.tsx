import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

const FAQSection = () => {
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const faqs = [
    {
      question: "How does AI help reduce missed dental appointments?",
      answer: "Our AI sends personalized automatic reminders via WhatsApp 24h and 2h before the appointment, confirms attendance, and manages a dynamic waiting list to fill vacant slots, reducing missed appointments by up to 40%."
    },
    {
      question: "Can I offer personalized treatment plans or promotions via AI?",
      answer: "Yes! The AI analyzes each patient's history and offers personalized promotions or treatment plans. You can configure automatic packages and the AI offers them at the ideal moment in the patient relationship."
    },
    {
      question: "Can I get reports on which procedures are most in demand?",
      answer: "Absolutely! The system generates detailed reports with specific KPIs for dental clinics: most popular procedures, revenue per treatment type, patient retention rate, peak demand hours, and much more."
    },
    {
      question: "Can the AI answer technical questions about dental procedures?",
      answer: "Yes, our knowledge base is specialized in dentistry. The AI can clarify doubts about pre and post-procedure care, necessary precautions, basic contraindications, and general guidance, always directing complex cases to the team."
    },
    {
      question: "How does integration with payment systems and inventory work?",
      answer: "The platform integrates with major payment systems and allows inventory control for dental products. The AI can suggest complementary products to performed treatments and process sales automatically through WhatsApp."
    },
    {
      question: "Is it possible to track patients' treatment progress?",
      answer: "Yes! Patients can send follow-up photos or x-rays through WhatsApp and our AI organizes these images in a visual timeline, allowing you to track treatment progress and adjust protocols as needed."
    }
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");
    try {
      const res = await fetch("/.netlify/functions/send-contact-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess("Message sent successfully! We'll get back to you soon.");
        setForm({ name: "", email: "", message: "" });
      } else {
        setError(data.error || "Failed to send message. Please try again.");
      }
    } catch (err) {
      setError("Unexpected error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isDesktop = typeof window !== 'undefined' ? window.innerWidth >= 768 : true;

  return (
    <section id="faq-section" className="py-20 bg-white overflow-x-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
              Frequently Asked
            </span> Questions
          </h2>
          <p className="text-xl text-gray-600">
            We clarify the main questions about our platform
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
          {isDesktop ? (
            <button
              type="button"
              className="inline-flex items-center px-6 py-3 border-2 border-green-500 text-green-600 font-semibold rounded-lg hover:bg-green-50 transition-colors duration-300"
              onClick={() => setShowEmailModal(true)}
            >
              Email
            </button>
          ) : (
            <a 
              href="mailto:contact@smartchat.com" 
              className="inline-flex items-center px-6 py-3 border-2 border-green-500 text-green-600 font-semibold rounded-lg hover:bg-green-50 transition-colors duration-300"
            >
              Email
            </a>
          )}
        </div>
      </div>
      <Dialog open={showEmailModal} onOpenChange={setShowEmailModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Contact us by Email</DialogTitle>
          </DialogHeader>
          {success && (
            <Alert className="mb-4">
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <Input
              name="email"
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <Textarea
              name="message"
              placeholder="Your message"
              rows={4}
              value={form.message}
              onChange={handleChange}
              required
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Sending..." : "Send Email"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default FAQSection; 