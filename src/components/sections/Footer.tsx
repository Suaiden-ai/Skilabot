
const Footer = () => {
  const companyLinks = [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact-us" }
  ];
  const featureLinks = ["Natural Language", "24/7 Availability", "Multi-platform", "Analytics"];
  const menuLinks = [
    { label: "FAQ", href: "/faq" },
    { label: "Login", href: "/auth" }
  ];

  return (
    <footer className="bg-gray-900 text-white py-16 px-6 mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-4 gap-8 mb-12">
          {/* Logo and Description */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">
              Skilabot
            </h3>
            <p className="text-gray-400 max-w-sm">
              Empowering businesses with intelligent AI conversations that transform customer experience.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Features Links */}
          <div>
            <h4 className="font-semibold mb-4">Features</h4>
            <ul className="space-y-2">
              {featureLinks.map((link, index) => (
                <li key={index} className="text-gray-400">
                  {link}
                </li>
              ))}
            </ul>
          </div>

          {/* Menu Links */}
          <div>
            <h4 className="font-semibold mb-4">Menu</h4>
            <ul className="space-y-2">
              {menuLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-400 text-sm">
            © 2025 Skilabot. All rights reserved. Created by Suaiden
          </div>
          {/* Social Icons removidos */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
