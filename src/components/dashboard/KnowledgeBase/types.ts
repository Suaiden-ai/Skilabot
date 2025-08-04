// Tipos e interfaces extraídos do KnowledgeBase

export interface AIConfiguration {
  id: string;
  ai_name: string;
  company_name: string;
  personality: string;
  agent_type: string;
  custom_prompt: string | null;
  final_prompt: string | null;
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
  "Digital Accounting for Small Businesses",
  "Professional Services",
  "Condominiums & Administrators",
  "Cleaning & Pools",
  "Other"
];

export const personalityOptions = [
  { value: "Friendly", label: "Friendly", icon: "Heart", description: "Warm and welcoming" },
  { value: "Professional", label: "Professional", icon: "Briefcase", description: "Formal and reliable" },
  { value: "Motivational", label: "Motivational", icon: "Zap", description: "Energetic and inspiring" },
  { value: "Polite", label: "Polite", icon: "GraduationCap", description: "Courteous and respectful" },
];

export const sectorOptions = [
  { value: "SDR", label: "SDR (Sales Development Representative)" },
  { value: "HR", label: "HR (Human Resources)" },
  { value: "Sales", label: "Sales" },
  { value: "Support", label: "Support" },
  { value: "Marketing", label: "Marketing" },
  { value: "Finance", label: "Finance" },
  { value: "Operations", label: "Operations" },
  { value: "Technology", label: "Technology" },
  { value: "Commercial", label: "Commercial" },
  { value: "Customer Service", label: "Customer Service" },
  { value: "Others", label: "Others" },
];