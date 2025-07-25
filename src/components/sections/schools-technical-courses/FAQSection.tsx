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
      question: "How does AI help reduce missed classes?",
      answer: "Our AI sends personalized automatic reminders via WhatsApp before each class, confirms attendance, and manages a dynamic waiting list to fill vacant spots, reducing absences by up to 40%."
    },
    {
      question: "Can I track student progress and attendance?",
      answer: "Yes! The platform provides real-time dashboards with attendance, grades, and engagement metrics for each student, making it easy to monitor and support their development."
    },
    {
      question: "Does the system integrate with other EdTech platforms?",
      answer: "Absolutely! Our solution integrates with major EdTech and school management systems, ensuring seamless data flow and centralized information."
    },
    {
      question: "Can students and parents receive personalized messages?",
      answer: "Yes, the AI can send personalized reminders, feedback, and important updates to students and parents, improving communication and engagement."
    },
    {
      question: "Is it possible to automate document management (certificates, reports)?",
      answer: "Yes! The platform automatically organizes certificates, grade reports, and student files, making them easily accessible and securely stored."
    },
    {
      question: "How fast can I set up the platform for my school?",
      answer: "You can get started in less than 5 minutes. Our onboarding is simple and our team provides dedicated support during the setup and trial period."
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
    <section id="faq-section" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#1A237E]">
            Frequently Asked <span className="text-[#1976D2]">Questions</span>
          </h2>
          <p className="text-xl text-[#23272F]">
            We clarify the main questions about our platform for technical schools
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border border-[#E3E6F0] rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold text-[#1A237E] hover:text-[#1976D2] transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-[#23272F] leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <div className="text-center mt-12">
        <p className="text-[#23272F] mb-6">Still have questions? Contact us!</p>
        <div className="flex gap-4 justify-center">
          <a 
            href="https://wa.me/5511999999999" 
            className="inline-flex items-center px-6 py-3 bg-[#1976D2] text-white font-semibold rounded-lg hover:bg-[#1565C0] transition-colors duration-300"
            target="_blank" 
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
          {isDesktop ? (
            <button
              type="button"
              className="inline-flex items-center px-6 py-3 border-2 border-[#1976D2] text-[#1976D2] font-semibold rounded-lg hover:bg-[#E3E6F0] transition-colors duration-300"
              onClick={() => setShowEmailModal(true)}
            >
              Email
            </button>
          ) : (
            <a 
              href="mailto:contact@smartchat.com" 
              className="inline-flex items-center px-6 py-3 border-2 border-[#1976D2] text-[#1976D2] font-semibold rounded-lg hover:bg-[#E3E6F0] transition-colors duration-300"
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