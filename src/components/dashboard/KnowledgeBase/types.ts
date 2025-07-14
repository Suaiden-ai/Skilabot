// Tipos e interfaces extraídos do KnowledgeBase

export interface AIConfiguration {
  id: string;
  ai_name: string;
  company_name: string;
  personality: string;
  agent_type: string;
  custom_prompt: string | null;
  has_tested: boolean;
}

export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export interface WhatsAppConnection {
  id: string;
  connection_status: 'connecting' | 'connected' | 'disconnected' | 'error';
  connected_at: string | null;
  phone_number: string | null;
}

export const agentTypeOptions = [
  "Gyms & Personal Trainers",
  "Marketing Agencies",
  "Tech Support Services",
  "Aesthetic Clinics",
  "Political Agents",
  "Dealerships and Resellers",
  "Dentistry",
  "Language Courses",
  "Schools & Technical Courses",
  "Infoproducers & Online Courses",
  "Online Fashion & Footwear",
  "Pet Shops and Vet Clinics",
  "Healthcare Professionals",
  "Psychologists & Therapists",
  "Restaurants and Deliveries",
  "Beauty Salons & Barber Shops",
  "Accounting & MEI Services",
  "Professional Services",
  "Condominiums & Administrators",
  "Cleaning & Pools"
];

export const personalityOptions = [
  { value: "Amigável", label: "Amigável", icon: "Heart", description: "Caloroso e acolhedor" },
  { value: "Profissional", label: "Profissional", icon: "Briefcase", description: "Formal e confiável" },
  { value: "Motivador", label: "Motivador", icon: "Zap", description: "Energético e inspirador" },
  { value: "Educado", label: "Educado", icon: "GraduationCap", description: "Cortês e respeitoso" },
]; 