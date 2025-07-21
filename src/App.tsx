
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import GymsPersonalTrainers from "./pages/GymsPersonalTrainers";
import MarketingAgencies from "./pages/MarketingAgencies";
import TechSupport from "./pages/TechSupport";
import AestheticClinics from "./pages/AestheticClinics";
import PoliticalAgents from "./pages/PoliticalAgents";
import DealershipsResellers from "./pages/DealershipsResellers";
import Agents from "./pages/Agents";
import WhatsappConnections from "./pages/WhatsappConnections";
import SpecializedConsultingPage from "./pages/SpecializedConsultingPage";
import DashboardLayout from "./components/layouts/DashboardLayout";
import KnowledgeBase from "./components/dashboard/KnowledgeBase";
import ChatwootPanel from "./components/dashboard/ChatwootPanel";
import ScrollToTop from "@/components/ScrollToTop";
import DashboardKanban from "./pages/DashboardKanban";
import AdminDashboard from "./components/dashboard/admin/AdminDashboard";
import AdminUsers from "./pages/admin-users";
import AdminSettings from "./pages/AdminSettings";
import AdminPayments from "./pages/AdminPayments";
import ConfirmPlan from "./pages/ConfirmPlan";
import Success from "./pages/Success";
import Plans from "./pages/Plans";
import Dentistry from "./pages/Dentistry";
import LanguageCourses from "./pages/LanguageCourses";
import SchoolsTechnicalCourses from "./pages/SchoolsTechnicalCourses";
import InfoproducersOnlineCourses from "./pages/InfoproducersOnlineCourses";
import OnlineFashionFootwear from "./pages/OnlineFashionFootwear";
import PetShopsVetClinics from "./pages/PetShopsVetClinics";
import HealthcareProfessionals from "./pages/HealthcareProfessionals";
import PsychologistsTherapists from "./pages/PsychologistsTherapists";
import RestaurantsDeliveries from "./pages/RestaurantsDeliveries";
import BeautySalonsBarberShops from "./pages/BeautySalonsBarberShops";
import AccountingMeiServices from "./pages/AccountingMeiServices";
import ProfessionalServices from "./pages/ProfessionalServices";
import CondominiumsAdministrators from "./pages/CondominiumsAdministrators";
import CleaningPools from "./pages/CleaningPools";
import ResetPassword from "./pages/ResetPassword";

const App = () => (
  <AuthProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/register" element={<Navigate to="/auth" replace />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/confirm-plan" element={<ConfirmPlan />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/success" element={<Success />} />
          <Route path="/professional-services" element={<ProfessionalServices />} />
          <Route path="/condominiums-administrators" element={<CondominiumsAdministrators />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<KnowledgeBase />} />
            <Route path="/agents" element={<Agents />} />
            <Route path="/whatsapp-connections" element={<WhatsappConnections />} />
            <Route path="/chatwoot-panel" element={<ChatwootPanel />} />
            <Route path="/specialized-consulting" element={<SpecializedConsultingPage />} />
            <Route path="/dashboard-kanban" element={<DashboardKanban />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin-users" element={<AdminUsers />} />
            <Route path="/admin-settings" element={<AdminSettings />} />
            <Route path="/admin-payments" element={<AdminPayments />} />
          </Route>
          <Route path="/gyms-personal-trainers" element={<GymsPersonalTrainers />} />
          <Route path="/marketing-agencies" element={<MarketingAgencies />} />
          <Route path="/tech-support" element={<TechSupport />} />
          <Route path="/aesthetic-clinics" element={<AestheticClinics />} />
          <Route path="/political-agents" element={<PoliticalAgents />} />
          <Route path="/dealerships-resellers" element={<DealershipsResellers />} />
          <Route path="/dentistry" element={<Dentistry />} />
          <Route path="/language-courses" element={<LanguageCourses />} />
          <Route path="/schools-technical-courses" element={<SchoolsTechnicalCourses />} />
          <Route path="/infoproducers-online-courses" element={<InfoproducersOnlineCourses />} />
          <Route path="/online-fashion-footwear" element={<OnlineFashionFootwear />} />
          <Route path="/pet-shops-vet-clinics" element={<PetShopsVetClinics />} />
          <Route path="/healthcare-professionals" element={<HealthcareProfessionals />} />
          <Route path="/psychologists-therapists" element={<PsychologistsTherapists />} />
          <Route path="/restaurants-deliveries" element={<RestaurantsDeliveries />} />
          <Route path="/beauty-salons-barber-shops" element={<BeautySalonsBarberShops />} />
          <Route path="/accounting-mei-services" element={<AccountingMeiServices />} />
          <Route path="/cleaning-pools" element={<CleaningPools />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </AuthProvider>
);

export default App;
