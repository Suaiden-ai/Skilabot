import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";

export default function AboutUs() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-white to-gray-50">
      <Header />
      <main className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-10 md:p-14">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 text-center tracking-tight">
            <span className="bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">About Us</span>
          </h1>
          <p className="text-lg text-gray-600 mb-6 text-center">
            Skilabot was born with the mission to transform the experience of customer service and relationships between companies and clients, using the most advanced Conversational Artificial Intelligence.
          </p>
          <h2 className="text-2xl font-semibold mb-2 mt-8 text-gray-900">Our Mission</h2>
          <p className="mb-4 text-gray-600">
            To democratize access to intelligent automation, making it possible for businesses of all sizes to offer fast, personalized, and 24/7 service—without losing the human touch.
          </p>
          <h2 className="text-2xl font-semibold mb-2 mt-8 text-gray-900">Our Vision</h2>
          <p className="mb-4 text-gray-600">
            To be a global reference in AI solutions for communication, helping companies grow sustainably and build trust-based relationships with their customers.
          </p>
          <h2 className="text-2xl font-semibold mb-2 mt-8 text-gray-900">Our Values</h2>
          <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-1">
            <li>Continuous innovation</li>
            <li>Ethics and transparency</li>
            <li>Customer success focus</li>
            <li>Inclusion and accessibility</li>
            <li>Passion for technology</li>
          </ul>
          <h2 className="text-2xl font-semibold mb-2 mt-8 text-gray-900">Why choose Skilabot?</h2>
          <p className="mb-4 text-gray-600">
            Our platform integrates cutting-edge AI, workflow automation, data analytics, and multichannel integration (WhatsApp, Instagram, Webchat, and more), enabling your company to:
          </p>
          <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-1">
            <li>Convert more leads and increase customer retention</li>
            <li>Reduce operational costs with smart automation</li>
            <li>Offer 24/7 service with quality and personalization</li>
            <li>Gain strategic insights to grow sustainably</li>
          </ul>
          <p className="text-lg text-gray-600 text-center">
            Join hundreds of companies already revolutionizing their customer service with Skilabot. Let's build the future of intelligent communication together!
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
} 