
import { Users, Bot, PieChart } from "lucide-react";
import FacebookIcon from "../icons/FacebookIcon";
import SlackIcon from "../icons/SlackIcon";
import WhatsAppIcon from "../icons/WhatsAppIcon";
import MessengerIcon from "../icons/MessengerIcon";
import InstagramIcon from "../icons/InstagramIcon";
import GmailIcon from "../icons/GmailIcon";
import TwitterIcon from "../icons/TwitterIcon";
import LinkedInIcon from "../icons/LinkedInIcon";
import DiscordIcon from "../icons/DiscordIcon";
import GoogleDriveIcon from "../icons/GoogleDriveIcon";
import TrelloIcon from "../icons/TrelloIcon";
import GoogleCalendarIcon from "../icons/GoogleCalendarIcon";
import ShopifyIcon from "../icons/ShopifyIcon";
import DropboxIcon from "../icons/DropboxIcon";
import WordPressIcon from "../icons/WordPressIcon";
import YouTubeIcon from "../icons/YouTubeIcon";
import HubSpotIcon from "../icons/HubSpotIcon";
import SalesforceIcon from "../icons/SalesforceIcon";
import MicrosoftTeamsIcon from "../icons/MicrosoftTeamsIcon";

// Helper para garantir que todos os ícones aceitem className
function withClassName(IconComponent) {
  return (props) => <IconComponent {...props} />;
}

const Integrations = () => {
  const integrations = [
    { name: "YouTube", icon: withClassName(YouTubeIcon), color: "text-red-500" },
    { name: "Dropbox", icon: withClassName(DropboxIcon), color: "text-blue-500" },
    { name: "Slack", icon: withClassName(SlackIcon), color: "text-purple-500" },
    { name: "WhatsApp", icon: withClassName(WhatsAppIcon), color: "text-green-500" },
    { name: "Messenger", icon: withClassName(MessengerIcon), color: "text-blue-400" },
    { name: "Facebook", icon: withClassName(FacebookIcon), color: "text-blue-600" },
    { name: "Instagram", icon: withClassName(InstagramIcon), color: "text-pink-500" },
    { name: "Gmail", icon: withClassName(GmailIcon), color: "text-red-500" },
    { name: "X", icon: withClassName(TwitterIcon), color: "text-black" },
    { name: "LinkedIn", icon: withClassName(LinkedInIcon), color: "text-blue-700" },
    { name: "Discord", icon: withClassName(DiscordIcon), color: "text-indigo-500" },
    { name: "Google Drive", icon: withClassName(GoogleDriveIcon), color: "text-green-600" },
    { name: "Trello", icon: withClassName(TrelloIcon), color: "text-blue-500" },
    { name: "Google Calendar", icon: withClassName(GoogleCalendarIcon), color: "text-blue-600" },
    { name: "Shopify", icon: withClassName(ShopifyIcon), color: "text-green-700" },
    { name: "WordPress", icon: withClassName(WordPressIcon), color: "text-blue-800" },
    { name: "HubSpot", icon: withClassName(HubSpotIcon), color: "text-orange-500" },
    { name: "Microsoft Teams", icon: withClassName(MicrosoftTeamsIcon), color: "text-indigo-600" },
    { name: "Salesforce", icon: withClassName(SalesforceIcon), color: "text-sky-500" },
  ];

  return (
    <section id="integrations" className="py-20 px-6 bg-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
            <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
            <span className="text-orange-400 text-sm uppercase tracking-wider ml-2">INTEGRATION</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start mb-16">
          <div>
            <h2 className="text-4xl font-bold text-gray-900">
              Conversational <span className="text-pink-400">Chatbot</span>
            </h2>
            {/* Mobile only: description below title */}
            <div className="block md:hidden mt-4">
              <p className="text-gray-600 leading-relaxed">
                Integrate your AI chatbot with WhatsApp, Instagram, Facebook, Slack, Gmail, YouTube, X, and more. Centralize conversations and automate customer service across all your channels with Skilabot.
              </p>
            </div>
          </div>
          {/* Desktop only: description to the right */}
          <div className="max-w-md hidden md:block">
            <p className="text-gray-600 leading-relaxed">
              Integrate your AI chatbot with WhatsApp, Instagram, Facebook, Slack, Gmail, YouTube, X, and more. Centralize conversations and automate customer service across all your channels with Skilabot.
            </p>
          </div>
        </div>

        <div className="relative">
          {/* Large Background Text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            <span className="text-9xl font-bold text-gray-200 select-none">
              Skilabot
            </span>
          </div>

          {/* Integration Icons - Marquee Animation */}
          <div className="relative z-10 overflow-x-hidden">
            <div className="flex animate-marquee min-w-max space-x-8">
              {[...integrations, ...integrations].map((integration, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg border flex items-center justify-center h-24 min-w-[220px] hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-center gap-3">
                    <integration.icon className={`w-6 h-6 ${integration.color}`} />
                    <span className="font-semibold text-gray-800">{integration.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Marquee animation keyframes */}
          <style>{`
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-marquee {
              animation: marquee 45s linear infinite;
            }
            @media (max-width: 768px) {
              .animate-marquee {
                animation-duration: 25s;
              }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
};

export default Integrations;
