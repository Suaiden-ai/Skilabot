
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Dumbbell, 
  Megaphone, 
  Wrench, 
  Heart, 
  Users, 
  ArrowRight,
  Car,
  Smile,
  Languages,
  GraduationCap,
  BookOpen,
  Shirt,
  PawPrint,
  Stethoscope,
  Brain,
  UtensilsCrossed,
  Scissors,
  Calculator,
  Briefcase,
  Building,
  Droplets
} from "lucide-react";
import { Link } from "react-router-dom";

const BusinessCards = () => {
  const businessTypes = [
    {
      title: "Gyms & Personal Trainers",
      description: "Schedule workouts, motivate students, and manage leads.",
      icon: Dumbbell,
      gradient: "from-blue-500 to-cyan-500",
      link: "/gyms-personal-trainers"
    },
    {
      title: "Marketing Agencies",
      description: "Lead generation and advanced segmentation.",
      icon: Megaphone,
      gradient: "from-purple-500 to-pink-500",
      link: "/marketing-agencies"
    },
    {
      title: "Tech Support Services",
      description: "Update repair status and reduce wait times.",
      icon: Wrench,
      gradient: "from-green-500 to-emerald-500",
      link: "/tech-support"
    },
    {
      title: "Aesthetic Clinics",
      description: "Schedule procedures and reduce no-shows.",
      icon: Heart,
      gradient: "from-rose-500 to-pink-500",
      link: "/aesthetic-clinics"
    },
    {
      title: "Political Agents",
      description: "Engage with voters and organize communication.",
      icon: Users,
      gradient: "from-indigo-500 to-blue-500",
      link: "/political-agents"
    },
    {
      title: "Dealerships and Resellers",
      description: "Optimize service and close more sales.",
      icon: Car,
      gradient: "from-orange-500 to-red-500",
      link: "/dealerships-resellers"
    },
    {
      title: "Dentistry & Dentistry",
      description: "Automate reminders and after-sales service.",
      icon: Smile,
      gradient: "from-teal-500 to-cyan-500",
      link: "/dentistry"
    },
    {
      title: "Language Courses",
      description: "Attract students and offer 24-hour bilingual support.",
      icon: Languages,
      gradient: "from-violet-500 to-purple-500",
      link: "/language-courses"
    },
    {
      title: "Schools & Technical Courses",
      description: "Automate enrollments and academic support.",
      icon: GraduationCap,
      gradient: "from-blue-600 to-indigo-600",
      link: "/schools-technical-courses"
    },
    {
      title: "Infoproducers & Online Courses",
      description: "Increase sales and support students 24 hours a day, 7 days a week.",
      icon: BookOpen,
      gradient: "from-emerald-500 to-green-500",
      link: "/infoproducers-online-courses"
    },
    {
      title: "Online Fashion & Footwear",
      description: "Answer questions and close instant sales.",
      icon: Shirt,
      gradient: "from-pink-500 to-rose-500",
      link: "/online-fashion-footwear"
    },
    {
      title: "Pet Shops and Vet Clinics",
      description: "Appointments, vaccinations and care on WhatsApp.",
      icon: PawPrint,
      gradient: "from-amber-500 to-orange-500",
      link: "/pet-shops-vet-clinics"
    },
    {
      title: "Healthcare Professionals",
      description: "Schedule appointments and reduce absences with 24-hour AI.",
      icon: Stethoscope,
      gradient: "from-red-500 to-pink-500",
      link: "/healthcare-professionals"
    },
    {
      title: "Psychologists & Therapists",
      description: "Initial screening and automated scheduling.",
      icon: Brain,
      gradient: "from-indigo-500 to-purple-500",
      link: "/psychologists-therapists"
    },
    {
      title: "Restaurants and Deliveries",
      description: "Fast and efficient service for orders.",
      icon: UtensilsCrossed,
      gradient: "from-yellow-500 to-orange-500",
      link: "/restaurants-deliveries"
    },
    {
      title: "Beauty Salons & Barber Shops",
      description: "Appointments and customer loyalty via AI.",
      icon: Scissors,
      gradient: "from-purple-500 to-indigo-500",
      link: "/beauty-salons-barber-shops"
    },
    {
      title: "Digital Accounting for Small Businesses",
      description: "Simplify queries and consultancy through AI.",
      icon: Calculator,
      gradient: "from-green-600 to-emerald-600",
      link: "/accounting"
    },
    {
      title: "Professional Services",
      description: "Generate quotes, schedules and specialized support.",
      icon: Briefcase,
      gradient: "from-gray-600 to-slate-600",
      link: "/professional-services"
    },
    {
      title: "Condominiums & Administrators",
      description: "Send invoices, notices and organize obligations.",
      icon: Building,
      gradient: "from-stone-500 to-gray-500",
      link: "/condominiums-administrators"
    },
    {
      title: "Cleaning & Pools",
      description: "Automatic scheduling and optimized routes.",
      icon: Droplets,
      gradient: "from-blue-400 to-cyan-400",
      link: "/cleaning-pools"
    }
  ];

  return (
    <section id="business-solutions" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-100 to-orange-100 rounded-full mb-4">
            <span className="text-sm font-medium bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
              BUSINESS SOLUTIONS
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
              Perfect for Every
            </span>
            <span className="block text-gray-900">Business Type</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how Skilabot can transform your business operations across different industries
          </p>
        </div>

        {/* Business Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {businessTypes.map((business, index) => {
            const IconComponent = business.icon;
            return (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white hover:-translate-y-1">
                <CardHeader className="pb-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${business.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-pink-500 transition-colors duration-300 leading-tight">
                    {business.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-sm leading-relaxed mb-4">
                    {business.description}
                  </CardDescription>
                  <Link to={business.link}>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full border-pink-500 text-pink-500 hover:bg-pink-50 group-hover:bg-pink-500 group-hover:text-white transition-all duration-300"
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BusinessCards;
