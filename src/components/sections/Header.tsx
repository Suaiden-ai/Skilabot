
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/" || location.pathname === "";

  const menuItems = isHome
    ? [
        { name: "Home", href: "#" },
        { name: "About", href: "#about" },
        { name: "Products", href: "#business-solutions" },
        { name: "Features", href: "#features" },
        { name: "Pricing", href: "#pricing" },
        { name: "Integrations", href: "#integrations" },
        { name: "Contact", href: "#contact" }
      ]
    : [
        { name: "Home", href: "/" },
        { name: "Features", href: "#benefits-section" },
        { name: "Pricing", href: "#plans-section" },
        { name: "Contact", href: "#faq-section" }
      ];

  const handleLoginClick = () => {
    navigate("/auth");
  };

  const handleGetStartedClick = () => {
    navigate("/auth");
  };

  const handleMenuClick = (item) => {
    if (item.name === "Home") {
      navigate("/");
      return;
    }
    if (isHome) {
      const sectionId = item.href.replace('#', '');
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate(`/#${sectionId}`);
      }
    } else {
      // Landing pages: Features -> benefits-section, Pricing -> plans-section, Contact -> faq-section
      const sectionId = item.href.replace('#', '');
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      } else {
        // fallback: navega para hash na mesma página
        window.location.hash = `#${sectionId}`;
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => navigate("/") }>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
              Skilabot
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleMenuClick(item)}
                className="text-gray-700 hover:text-pink-500 transition-colors duration-200 font-medium bg-transparent border-none outline-none cursor-pointer"
                type="button"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="outline" 
              className="border-pink-500 text-pink-500 hover:bg-pink-50"
              onClick={handleLoginClick}
            >
              Login
            </Button>
            <Button 
              className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white"
              onClick={handleGetStartedClick}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => { handleMenuClick(item); setIsMenuOpen(false); }}
                  className="text-gray-700 hover:text-pink-500 transition-colors duration-200 font-medium bg-transparent border-none outline-none text-left cursor-pointer"
                  type="button"
                >
                  {item.name}
                </button>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                <Button 
                  variant="outline" 
                  className="border-pink-500 text-pink-500 hover:bg-pink-50"
                  onClick={handleLoginClick}
                >
                  Login
                </Button>
                <Button 
                  className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white"
                  onClick={handleGetStartedClick}
                >
                  Get Started
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
