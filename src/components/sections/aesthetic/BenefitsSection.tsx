
import { useState } from "react";
import { Star, Calendar, Heart, BarChart, Zap } from "lucide-react";

const BenefitsSection = () => {
  const [activeTab, setActiveTab] = useState("agendamento");

  const tabs = [
    { id: "agendamento", label: "Agendamento", icon: Calendar },
    { id: "tratamentos", label: "Tratamentos", icon: Heart },
    { id: "gestao", label: "Gestão", icon: BarChart },
    { id: "automacao", label: "Automação", icon: Zap }
  ];

  const tabContent = {
    agendamento: [
      {
        icon: "💆",
        title: "Agendamento Inteligente",
        description: "Clientes agendam consultas e tratamentos diretamente via WhatsApp com confirmação automática",
        rating: 4.9,
        benefits: ["Agendamento fácil", "Confirmação automática", "Lembretes"]
      },
      {
        icon: "⏰",
        title: "Gestão de Filas",
        description: "Sistema otimiza agenda considerando tempo de procedimentos e disponibilidade",
        rating: 4.8,
        benefits: ["Otimização automática", "Tempo preciso", "Eficiência máxima"]
      },
      {
        icon: "📱",
        title: "Confirmação por WhatsApp",
        description: "Lembretes automáticos com opção de confirmação ou reagendamento instantâneo",
        rating: 4.7,
        benefits: ["Lembretes automáticos", "Reagendamento fácil", "Taxa de comparecimento"]
      }
    ],
    tratamentos: [
      {
        icon: "✨",
        title: "Catálogo Interativo",
        description: "Apresenta tratamentos com antes/depois, preços e durações via chatbot",
        rating: 4.9,
        benefits: ["Antes/depois", "Preços claros", "Informações completas"]
      },
      {
        icon: "📊",
        title: "Histórico de Tratamentos",
        description: "Acompanha evolução do cliente com fotos, datas e resultados obtidos",
        rating: 4.8,
        benefits: ["Evolução visual", "Histórico completo", "Resultados medidos"]
      },
      {
        icon: "🎯",
        title: "Recomendações Personalizadas",
        description: "IA sugere tratamentos baseados no perfil, histórico e objetivos do cliente",
        rating: 4.7,
        benefits: ["IA personalizada", "Sugestões precisas", "Objetivos claros"]
      }
    ],
    gestao: [
      {
        icon: "📋",
        title: "Dashboard Estética",
        description: "Visão completa de agendamentos, receita e satisfação dos clientes",
        rating: 4.9,
        benefits: ["Visão 360°", "Métricas importantes", "Satisfação medida"]
      },
      {
        icon: "💰",
        title: "Gestão Financeira",
        description: "Controle de pagamentos, pacotes e promoções com relatórios automáticos",
        rating: 4.8,
        benefits: ["Controle financeiro", "Pacotes gerenciados", "Relatórios automáticos"]
      },
      {
        icon: "👥",
        title: "CRM Especializado",
        description: "Perfil detalhado com preferências, alergias e histórico completo",
        rating: 4.7,
        benefits: ["Perfis detalhados", "Alergias registradas", "Histórico completo"]
      }
    ],
    automacao: [
      {
        icon: "🔗",
        title: "Integração Equipamentos",
        description: "Conecta com equipamentos estéticos para registros automáticos de sessões",
        rating: 4.9,
        benefits: ["Equipamentos integrados", "Registros automáticos", "Dados precisos"]
      },
      {
        icon: "📸",
        title: "Fotodocumentação Automática",
        description: "Organiza fotos antes/depois automaticamente por cliente e tratamento",
        rating: 4.8,
        benefits: ["Organização automática", "Antes/depois", "Portfólio visual"]
      },
      {
        icon: "🔔",
        title: "Follow-up Inteligente",
        description: "Acompanhamento pós-tratamento com pesquisas de satisfação automáticas",
        rating: 4.7,
        benefits: ["Follow-up automático", "Satisfação medida", "Cuidado contínuo"]
      }
    ]
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Benefícios para Clínicas Estéticas
        </h2>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-blue-500 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <IconComponent className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tabContent[activeTab].map((item, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">{item.description}</p>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(item.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-700">{item.rating}/5.0</span>
              </div>

              {/* Benefits */}
              <div className="flex flex-wrap gap-2">
                {item.benefits.map((benefit, idx) => (
                  <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                    {benefit}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
