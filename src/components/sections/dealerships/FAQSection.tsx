
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState(0);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

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
        <h2 className="text-4xl font-bold text-center text-[#23272F] mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-xl text-[#343A40] text-center mb-12">
          Answers to the main questions about dealership automation
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-[#E3E6F0] rounded-lg overflow-hidden">
              <button
                onClick={() => setOpenFAQ(openFAQ === index ? -1 : index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-[#E3E6F0] transition-colors duration-200"
              >
                <span className="font-semibold text-[#23272F] pr-4">{faq.question}</span>
                {openFAQ === index ? (
                  <ChevronUp className="w-5 h-5 text-[#22306e] flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#22306e] flex-shrink-0" />
                )}
              </button>
              {openFAQ === index && (
                <div className="px-6 pb-4">
                  <p className="text-[#343A40] leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="text-center mt-12">
        <p className="text-[#343A40] mb-6">Still have questions? Contact us!</p>
        <div className="flex gap-4 justify-center">
          <a 
            href="https://wa.me/5511999999999" 
            className="inline-flex items-center px-6 py-3 bg-[#22306e] text-white font-semibold rounded-lg hover:bg-[#1A237E] transition-colors duration-300"
            target="_blank" 
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
          {isDesktop ? (
            <button
              type="button"
              className="inline-flex items-center px-6 py-3 border-2 border-[#22306e] text-[#22306e] font-semibold rounded-lg hover:bg-[#E3E6F0] transition-colors duration-300"
              onClick={() => setShowEmailModal(true)}
            >
              Email
            </button>
          ) : (
            <a 
              href="mailto:contact@smartchat.com" 
              className="inline-flex items-center px-6 py-3 border-2 border-[#22306e] text-[#22306e] font-semibold rounded-lg hover:bg-[#E3E6F0] transition-colors duration-300"
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
