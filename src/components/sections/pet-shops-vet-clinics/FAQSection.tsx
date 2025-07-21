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
      question: "How does the platform help schedule appointments and grooming for pets?",
      answer: "Clients can book appointments, grooming, and other services directly via WhatsApp, Instagram, or website. The system sends automatic reminders and confirmations, reducing no-shows and optimizing your clinic or pet shop's schedule."
    },
    {
      question: "Can I send vaccination and follow-up reminders?",
      answer: "Yes! The platform sends automatic reminders for vaccinations, follow-up appointments, and check-ups, ensuring pets are always up to date with their health."
    },
    {
      question: "Can I promote offers and news to my clients?",
      answer: "With just a few clicks, send promotions, news, and health tips to all your clients or segment by profile, increasing engagement and sales."
    },
    {
      question: "Is the platform secure and easy to use?",
      answer: "Yes! We designed everything to be intuitive, secure, and practical for both you and your clients."
    },
    {
      question: "How does the free trial work?",
      answer: "You can try all features free for 7 days, no commitment. After that, choose the plan that best fits your business."
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-[#36454F]">
            Get your questions answered about our solution for pet shops and vet clinics
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border border-[#A7E9AF] rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold text-[#36454F] hover:text-[#43BFA3] transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-[#36454F] leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="text-center mt-12">
          <p className="text-[#36454F] mb-6">Still have questions? Contact us!</p>
          <div className="flex gap-4 justify-center">
            <a 
              href="https://wa.me/5511999999999" 
              className="inline-flex items-center px-6 py-3 bg-[#43BFA3] text-white font-semibold rounded-lg hover:bg-[#369e85] transition-colors duration-300"
              target="_blank" 
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
            {isDesktop ? (
              <button
                type="button"
                className="inline-flex items-center px-6 py-3 border-2 border-[#43BFA3] text-[#43BFA3] font-semibold rounded-lg hover:bg-[#A7E9AF]/20 transition-colors duration-300"
                onClick={() => setShowEmailModal(true)}
              >
                Email
              </button>
            ) : (
              <a 
                href="mailto:contato@seudominio.com" 
                className="inline-flex items-center px-6 py-3 border-2 border-[#43BFA3] text-[#43BFA3] font-semibold rounded-lg hover:bg-[#A7E9AF]/20 transition-colors duration-300"
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
      </div>
    </section>
  );
};

export default FAQSection; 