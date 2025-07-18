import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, useDroppable, DragOverlay } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Inbox, Phone, Calendar, CheckCircle, XCircle, TrendingUp, MessageCircle, Trophy } from "lucide-react";
import { SortableItem } from "@/components/SortableItem";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { parseISO, isThisWeek, isThisMonth, parse } from "date-fns";
import { useAuth } from "@/contexts/AuthContext";
import { usePageTitle } from "@/hooks/usePageTitle";

type Lead = {
  id: number;
  name_lead: string;
  phone_lead: string;
  status?: string;
};

const initialColumns = [
  { id: "col-1", name: "Lead", cards: [] },
  { id: "col-2", name: "Contacted", cards: [] },
  { id: "col-3", name: "Proposal", cards: [] },
  { id: "col-4", name: "Closed", cards: [] },
];

function DroppableColumn({ col, children, isOver }) {
  const { setNodeRef, isOver: over } = useDroppable({ id: col.id });
  return (
    <div
      ref={setNodeRef}
      className={`bg-white rounded-xl shadow-md p-4 min-w-[280px] flex flex-col transition-all duration-200 ${over || isOver ? 'ring-2 ring-blue-400' : ''}`}
      style={{ minHeight: 200, maxHeight: 440, overflowY: 'auto' }}
    >
      {children}
    </div>
  );
}

function BottomDropZone({ id, label, color, activeCard }) {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <div
      ref={setNodeRef}
      className={`w-72 h-24 border-2 rounded-xl flex items-center justify-center text-xl font-bold shadow-lg pointer-events-auto transition-all duration-200 hover:scale-105 select-none ${
        color === 'red'
          ? `bg-red-100 border-red-400 text-red-700 ${isOver ? 'scale-110 ring-4 ring-red-300' : ''}`
          : `bg-green-100 border-green-400 text-green-700 ${isOver ? 'scale-110 ring-4 ring-green-300' : ''}`
      }`}
      style={{ outline: 'none' }}
    >
      {label}
    </div>
  );
}

// Novo componente KanbanCard
function KanbanCard({ title, nameinbox, value, data_e_hora, status, isDragging, account_id, inbox_id, id_conversa, setModalOpen }: {
  title: string;
  nameinbox?: string;
  value?: string;
  data_e_hora?: string;
  status?: string;
  isDragging?: boolean;
  account_id?: string | number;
  inbox_id?: string | number;
  id_conversa?: string | number;
  setModalOpen: (open: boolean) => void;
}) {
  const [showDialog, setShowDialog] = useState(false);
  const [loadingSSO, setLoadingSSO] = useState(false);
  const canOpen = account_id && inbox_id && id_conversa;
  const { user } = useAuth();
  const handleOpen = () => {
    setShowDialog(true);
    setModalOpen(true);
  };
  const handleClose = (e) => {
    e.stopPropagation();
    setShowDialog(false);
    setModalOpen(false);
  };
  console.log('KanbanCard:', { account_id, inbox_id, id_conversa });
  // Nova função para SSO
  const handleGoToConversation = () => {
    if (account_id && inbox_id && id_conversa) {
      const url = `${import.meta.env.VITE_SMARTCHAT_BASE_URL}/app/accounts/${account_id}/inbox/${inbox_id}/conversations/${id_conversa}`;
      window.open(url, '_blank');
    } else {
      alert('Missing data to open the conversation!');
    }
  };
  // Handler para login SSO automático
  const handleSsoLogin = async (e) => {
    e.preventDefault();
    setLoadingSSO(true);
    try {
      if (!user) {
        alert('You must be logged in.');
        setLoadingSSO(false);
        return;
      }
      // Buscar user_id_chatwoot do usuário logado
      const { data, error } = await supabase
        .from('chatwoot_accounts')
        .select('user_id_chatwoot')
        .eq('user_id', user.id)
        .maybeSingle();
      if (error || !data || !data.user_id_chatwoot) {
        alert('Could not find your Chatwoot SSO ID.');
        setLoadingSSO(false);
        return;
      }
      // POST para o webhook
      const resp = await fetch(`${import.meta.env.VITE_NWH_BASE_URL}/webhook/sso_link_chatwoot`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id_chatwoot: data.user_id_chatwoot })
      });
      if (!resp.ok) {
        alert('Error getting SSO login link.');
        setLoadingSSO(false);
        return;
      }
      const result = await resp.json();
      if (result.url && result.url.startsWith('http')) {
        window.open(result.url, '_blank');
      } else {
        alert('Could not get SSO login link.');
      }
    } catch (err) {
      alert('Error getting SSO login link.');
    } finally {
      setLoadingSSO(false);
    }
  };
  return (
    <>
      <div
        onDoubleClick={canOpen ? handleOpen : undefined}
        className={`bg-blue-50 ${isDragging ? 'border-2 shadow-2xl scale-105 opacity-95' : 'border border-blue-200 shadow'} rounded-lg p-3 flex flex-col gap-1 relative transition-all duration-300 border-l-4 border-blue-400 hover:shadow-xl hover:scale-[1.03] animate-fadein hover:bg-blue-100`}
        style={{
          animation: 'fadein 0.6s',
          pointerEvents: isDragging ? 'none' : undefined,
          minWidth: isDragging ? 220 : undefined,
        }}
      >
        <div className="flex justify-between items-center">
          <div className="font-medium text-blue-900 text-lg mb-1">{title}</div>
          {/* Botão de três pontos sempre visível para depuração */}
          <button
            className="p-1 rounded hover:bg-blue-200"
            onClick={e => {
              e.stopPropagation();
              handleOpen(); // SEM IF!
            }}
            onMouseDown={e => e.stopPropagation()}
            onPointerDown={e => e.stopPropagation()}
            onTouchStart={e => e.stopPropagation()}
            data-dnd-kit-no-drag
            title="Opções"
            type="button"
          >
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>
          </button>
        </div>
        {nameinbox && (
          <div className="flex items-center gap-1 text-xs text-gray-700">
            <Inbox className="w-4 h-4 text-blue-400" />
            <span><b>Inbox:</b> {nameinbox}</span>
          </div>
        )}
        {value && (
          <div className="flex items-center gap-1 text-xs text-blue-700">
            <Phone className="w-4 h-4 text-blue-400" />
            <span><b>Phone:</b> {value}</span>
          </div>
        )}
        {data_e_hora && (
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Calendar className="w-4 h-4 text-blue-400" />
            <span><b>Date:</b> {data_e_hora}</span>
          </div>
        )}
        {status && <div className="text-xs text-gray-500 mt-1">{status}</div>}
      </div>
      {showDialog && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-40 pointer-events-auto"
          onClick={handleClose}
          onMouseDown={handleClose}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl p-8 min-w-[320px] flex flex-col items-center relative max-w-xs w-full"
            onClick={e => e.stopPropagation()}
            onMouseDown={e => e.stopPropagation()}
            onPointerDown={e => e.stopPropagation()}
            onTouchStart={e => e.stopPropagation()}
          >
            <MessageCircle className="w-10 h-10 text-blue-500 mb-2" />
            <div className="font-bold text-xl mb-2 text-center">Lead Options</div>
            <div className="w-full flex flex-col items-center mb-4">
              <div className="bg-blue-50 text-blue-800 px-3 py-2 rounded-lg text-sm text-center mb-2">
                Are you already logged in? <br />If not, please <button onClick={handleSsoLogin} className='text-blue-600 underline hover:text-blue-800 font-semibold' disabled={loadingSSO}>{loadingSSO ? 'Loading...' : 'log in here'}</button>.
              </div>
            </div>
            <button
              className="mb-3 w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 text-base font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={handleGoToConversation}
              disabled={loadingSSO}
            >
              <MessageCircle className="w-5 h-5" />
              Go to conversation
            </button>
            <button
              className="text-gray-400 hover:text-gray-700 text-xs underline absolute right-4 bottom-4"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

export default function DashboardKanban() {
  usePageTitle("Kanban Dashboard | Skilabot");
  const [columns, setColumns] = useState(initialColumns);
  const [newColName, setNewColName] = useState("");
  const sensors = useSensors(useSensor(PointerSensor));
  const [activeCard, setActiveCard] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [wonCount, setWonCount] = useState(0);
  const [lostCount, setLostCount] = useState(0);
  const [wonLeads, setWonLeads] = useState([]);
  const [lostLeads, setLostLeads] = useState([]);
  const [showListModal, setShowListModal] = useState(false);
  const [listType, setListType] = useState<'won' | 'lost' | null>(null);
  const [leadFilter, setLeadFilter] = useState<'all' | 'week' | 'month'>('all');
  const [page, setPage] = useState(1);
  // Search state
  const [search, setSearch] = useState("");
  // Advanced filters
  const [statusFilter, setStatusFilter] = useState("all"); // all, Lead, Contacted, Proposal, Closed
  const [periodFilter, setPeriodFilter] = useState("all"); // all, week, month

  // Função para buscar leads do Supabase
  const fetchLeads = async () => {
    const { data, error } = await supabase
      .from('chatwoot_leads')
      .select('id, name_lead, phone_lead, status, nameinbox, data_e_hora, account_id, inbox_id, id_conversa');
    if (!error && Array.isArray(data)) {
      setWonCount(data.filter(lead => lead.status === 'ganho').length);
      setLostCount(data.filter(lead => lead.status === 'perdido').length);
      setWonLeads(data.filter(lead => lead.status === 'ganho'));
      setLostLeads(data.filter(lead => lead.status === 'perdido'));
      const leads = (data.filter(
        (item) =>
          item !== null &&
          typeof item === 'object' &&
          (item as any).id !== undefined &&
          (item as any).name_lead !== undefined &&
          (item as any).phone_lead !== undefined &&
          !('error' in (item as any))
      ) as unknown) as Lead[];
      setColumns(cols => cols.map(col =>
        col.name === "Lead"
          ? { ...col, cards: leads
              .filter(lead => (!lead.status || lead.status === "Lead") && lead.phone_lead !== "+123456")
              .map(lead => ({
                id: `lead-${lead.id}`,
                title: lead.name_lead,
                value: lead.phone_lead,
                status: lead.status || "New Lead",
                nameinbox: (lead as any).nameinbox,
                data_e_hora: (lead as any).data_e_hora,
                account_id: (lead as any).account_id,
                inbox_id: (lead as any).inbox_id,
                id_conversa: (lead as any).id_conversa
              })) }
          : col
      ));
    }
  };

  // Função auxiliar para parsear datas em múltiplos formatos
  function parseLeadDate(dateStr) {
    if (!dateStr) return null;
    let date = parseISO(dateStr);
    if (isNaN(date)) {
      // Tenta formato brasileiro: dd/MM/yyyy, HH:mm:ss
      try {
        date = parse(dateStr, 'dd/MM/yyyy, HH:mm:ss', new Date());
      } catch {}
    }
    return isNaN(date) ? null : date;
  }

  // Função para filtrar leads por data
  function filterLeadsByDate(leads) {
    if (leadFilter === 'all') return leads;
    if (leadFilter === 'week') {
      return leads.filter(lead => {
        const date = parseLeadDate(lead.data_e_hora);
        if (!date) return false;
        return isThisWeek(date, { weekStartsOn: 1 });
      });
    }
    if (leadFilter === 'month') {
      return leads.filter(lead => {
        const date = parseLeadDate(lead.data_e_hora);
        if (!date) return false;
        return isThisMonth(date);
      });
    }
    return leads;
  }

  // Função para filtrar cards por busca, status e período
  function filterCards(cards, colName) {
    let filtered = cards;
    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(card => (card.status || colName) === statusFilter);
    }
    // Period filter
    if (periodFilter !== "all") {
      filtered = filtered.filter(card => {
        const date = parseLeadDate(card.data_e_hora);
        if (!date) return false;
        if (periodFilter === "week") return isThisWeek(date, { weekStartsOn: 1 });
        if (periodFilter === "month") return isThisMonth(date);
        return true;
      });
    }
    // Search filter
    if (search.trim()) {
      const s = search.trim().toLowerCase();
      filtered = filtered.filter(card =>
        (card.title && card.title.toLowerCase().includes(s)) ||
        (card.value && card.value.toLowerCase().includes(s))
      );
    }
    return filtered;
  }

  // Resetar página ao trocar filtro ou tipo de lista
  useEffect(() => {
    setPage(1);
  }, [leadFilter, listType, showListModal]);

  // Paginação
  const leadsToShow = filterLeadsByDate(listType === 'won' ? wonLeads : lostLeads);
  const totalPages = Math.ceil(leadsToShow.length / 5) || 1;
  const paginatedLeads = leadsToShow.slice((page - 1) * 5, page * 5);

  // Buscar leads ao montar
  useEffect(() => {
    fetchLeads();
  }, []);

  // Colunas fixas: não permitir adicionar ou remover

  // Remove card
  const handleRemoveCard = (colId, cardId) => {
    setColumns(columns.map(col =>
      col.id === colId
        ? { ...col, cards: col.cards.filter(card => card.id !== cardId) }
        : col
    ));
  };

  // Drag & drop handlers
  const handleDragStart = (event) => {
    setActiveCard(event.active.id);
  };
  // Dropzones IDs
  const DROPZONE_WON = "dropzone-won";
  const DROPZONE_LOST = "dropzone-lost";

  const handleDragEnd = async (event) => {
    setActiveCard(null);
    const { active, over } = event;
    if (!over) return;
    const activeId = active.id;
    const overId = over.id;
    // Se for drop em GANHO ou PERDIDO
    if (overId === "dropzone-won" || overId === "dropzone-lost") {
      let fromColIdx = -1, fromCardIdx = -1;
      columns.forEach((col, ci) => {
        const idx = col.cards.findIndex(card => card.id === activeId);
        if (idx !== -1) {
          fromColIdx = ci;
          fromCardIdx = idx;
        }
      });
      if (fromColIdx === -1 || fromCardIdx === -1) return;
      const card = columns[fromColIdx].cards[fromCardIdx];
      setColumns(cols => cols.map((col, i) =>
        i === fromColIdx ? { ...col, cards: col.cards.filter((_, idx) => idx !== fromCardIdx) } : col
      ));
      const leadId = card.id.replace("lead-", "");
      const novoStatus = overId === "dropzone-won" ? "ganho" : "perdido";
      await supabase
        .from("chatwoot_leads")
        .update({ status: novoStatus } as any)
        .eq("id", leadId);
      // Atualiza listas e contadores após salvar
      fetchLeads();
      return;
    }
    // Movimentação normal entre colunas
    let fromColIdx = -1, fromCardIdx = -1;
    columns.forEach((col, ci) => {
      const idx = col.cards.findIndex(card => card.id === activeId);
      if (idx !== -1) {
        fromColIdx = ci;
        fromCardIdx = idx;
      }
    });
    if (fromColIdx === -1 || fromCardIdx === -1) return;
    const toColIdx = columns.findIndex(col => col.id === overId);
    if (toColIdx !== -1) {
      if (fromColIdx === toColIdx) return;
      const card = columns[fromColIdx].cards[fromCardIdx];
      setColumns(cols => {
        const newCols = [...cols];
        newCols[fromColIdx] = {
          ...newCols[fromColIdx],
          cards: newCols[fromColIdx].cards.filter((_, i) => i !== fromCardIdx)
        };
        newCols[toColIdx] = {
          ...newCols[toColIdx],
          cards: [...newCols[toColIdx].cards, { ...card, status: newCols[toColIdx].name }]
        };
        return newCols;
      });
      return;
    }
    // Entre cards normais
    let toColIdx2 = -1, toCardIdx = -1;
    columns.forEach((col, ci) => {
      const idx = col.cards.findIndex(card => card.id === overId);
      if (idx !== -1) {
        toColIdx2 = ci;
        toCardIdx = idx;
      }
    });
    if (toColIdx2 === -1 || toCardIdx === -1) return;
    const card = columns[fromColIdx].cards[fromCardIdx];
    setColumns(cols => {
      const newCols = [...cols];
      newCols[fromColIdx] = {
        ...newCols[fromColIdx],
        cards: newCols[fromColIdx].cards.filter((_, i) => i !== fromCardIdx)
      };
      newCols[toColIdx2] = {
        ...newCols[toColIdx2],
        cards: [
          ...newCols[toColIdx2].cards.slice(0, toCardIdx),
          { ...card, status: newCols[toColIdx2].name },
          ...newCols[toColIdx2].cards.slice(toCardIdx)
        ]
      };
      return newCols;
    });
  };

  // Helper para pegar o card ativo
  const getActiveCardData = () => {
    for (const col of columns) {
      const card = col.cards.find(c => c.id === activeCard);
      if (card) return card;
    }
    return null;
  };

  // Fade-in animation
  const style = document.createElement('style');
  style.innerHTML = `@keyframes fadein { from { opacity: 0; transform: translateY(16px);} to { opacity: 1; transform: none;} }`;
  document.head.appendChild(style);

  // Métricas dinâmicas baseadas nos filtros
  const filteredColumns = columns.map(col => ({
    ...col,
    cards: filterCards(col.cards, col.name)
  }));
  const totalLeads = filteredColumns.reduce((sum, col) => sum + col.cards.length, 0);
  const totalLeadInitial = columns.find(col => col.name === 'Lead')?.cards.length || 0;
  const closedCol = filteredColumns.find(col => col.name === 'Closed');
  const closedCount = closedCol ? closedCol.cards.length : 0;
  const conversionRate = totalLeadInitial > 0 ? ((closedCount / totalLeadInitial) * 100).toFixed(1) : '0.0';
  // WON/LOST já são filtrados por busca/período
  const wonFiltered = filterCards(wonLeads, 'Closed');
  const lostFiltered = filterCards(lostLeads, 'Closed');
  // Ativos: todos menos WON/LOST
  const activeLeads = totalLeads;
  // Painel de métricas
  return (
    <div className={`min-h-screen bg-gray-50 py-10 px-4`}>
      <h1 className="text-3xl font-bold mb-8 text-center">KANBAN BOARD</h1>
      {/* Painel de métricas organizado - agora só principais */}
      <div className="flex flex-col items-center w-full mb-6">
        <div className="flex flex-wrap justify-center gap-4 w-full max-w-3xl overflow-x-auto pb-2">
          <div className="flex flex-wrap gap-4 justify-center w-full">
            {/* Remover o card de Conversion Rate, manter apenas WON e LOST */}
            <div className="flex flex-col items-center justify-center bg-green-50 border border-green-200 rounded-xl px-5 py-3 shadow-sm min-w-[150px]">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-700" />
                <div>
                  <div className="text-xs text-green-700 font-medium">WON</div>
                  <div className="text-lg font-bold text-green-800">{wonFiltered.length}</div>
                </div>
              </div>
              <button
                onClick={() => { setListType('won'); setShowListModal(true); }}
                className="mt-2 px-3 py-1 text-xs bg-green-200 text-green-900 rounded hover:bg-green-300 transition font-medium shadow-sm"
              >View Leads</button>
            </div>
            <div className="flex flex-col items-center justify-center bg-red-50 border border-red-200 rounded-xl px-5 py-3 shadow-sm min-w-[150px]">
              <div className="flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-600" />
                <div>
                  <div className="text-xs text-red-700 font-medium">LOST</div>
                  <div className="text-lg font-bold text-red-800">{lostFiltered.length}</div>
                </div>
              </div>
              <button
                onClick={() => { setListType('lost'); setShowListModal(true); }}
                className="mt-2 px-3 py-1 text-xs bg-red-200 text-red-900 rounded hover:bg-red-300 transition font-medium shadow-sm"
              >View Leads</button>
            </div>
          </div>
        </div>
      </div>
      {/* Search and filters totalmente à esquerda */}
      <div className="flex flex-col sm:flex-row justify-start items-center gap-3 mb-4 w-full">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search leads by name or phone..."
          className="w-full sm:w-72 max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
        />
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="w-full sm:w-48 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
        >
          <option value="all">All Status</option>
          <option value="Lead">Lead</option>
          <option value="Contacted">Contacted</option>
          <option value="Proposal">Proposal</option>
          <option value="Closed">Closed</option>
        </select>
        <select
          value={periodFilter}
          onChange={e => setPeriodFilter(e.target.value)}
          className="w-full sm:w-48 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
        >
          <option value="all">All Periods</option>
          <option value="week">This week</option>
          <option value="month">This month</option>
        </select>
      </div>
      <Dialog open={showListModal} onOpenChange={setShowListModal}>
        <DialogContent className="max-w-lg rounded-2xl shadow-2xl p-0 overflow-hidden">
          <div className="flex flex-col w-full">
            <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-50 to-blue-100 py-5 px-6 border-b relative">
              {listType === 'won' ? (
                <Trophy className="w-7 h-7 text-yellow-500" />
              ) : (
                <XCircle className="w-7 h-7 text-red-500" />
              )}
              <span className="text-2xl font-bold text-blue-900 tracking-tight">
                {listType === 'won' ? 'WON Leads' : 'LOST Leads'}
              </span>
              {/* Remover botão customizado de fechar (X) aqui */}
            </div>
            <div className="flex gap-2 mb-4 px-6 pt-4">
              <button onClick={() => setLeadFilter('all')} className={`px-4 py-2 rounded-full font-medium transition-all text-sm ${leadFilter === 'all' ? 'bg-blue-600 text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-blue-100'}`}>All</button>
              <button onClick={() => setLeadFilter('week')} className={`px-4 py-2 rounded-full font-medium transition-all text-sm ${leadFilter === 'week' ? 'bg-blue-600 text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-blue-100'}`}>This week</button>
              <button onClick={() => setLeadFilter('month')} className={`px-4 py-2 rounded-full font-medium transition-all text-sm ${leadFilter === 'month' ? 'bg-blue-600 text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-blue-100'}`}>This month</button>
            </div>
            <div className="max-h-96 overflow-y-auto px-6 pb-6">
              <table className="w-full text-sm rounded-xl overflow-hidden">
                <thead>
                  <tr className="border-b bg-blue-50 text-blue-900">
                    <th className="text-left py-3 px-2 font-semibold">Name</th>
                    <th className="text-left py-3 px-2 font-semibold">Phone</th>
                    <th className="text-left py-3 px-2 font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedLeads.map((lead, idx) => (
                    <tr key={lead.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}>
                      <td className="py-2 px-2 font-medium text-gray-800">{lead.name_lead}</td>
                      <td className="py-2 px-2 text-blue-700 font-mono">{lead.phone_lead}</td>
                      <td className="py-2 px-2 text-gray-500">{lead.data_e_hora || '-'}</td>
                    </tr>
                  ))}
                  {paginatedLeads.length === 0 && (
                    <tr><td colSpan={3} className="text-center py-6 text-gray-400">No leads found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            {leadsToShow.length > 5 && (
              <div className="flex justify-between items-center mt-2 px-6 pb-4">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className={`px-4 py-2 rounded-full font-medium text-sm ${page === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                >Previous</button>
                <span className="text-sm text-gray-700">Page {page} of {totalPages}</span>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className={`px-4 py-2 rounded-full font-medium text-sm ${page === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                >Next</button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
        <div className="flex gap-6 overflow-x-auto pb-4">
          {columns.map((col) => (
            <DroppableColumn key={col.id} col={col} isOver={activeCard && col.cards.length === 0}>
              <div className="flex items-center justify-between mb-4">
                <span className="font-semibold text-lg">{col.name}</span>
                {/* Botão de adicionar card removido */}
              </div>
              <SortableContext items={col.cards.map(card => card.id)} strategy={verticalListSortingStrategy}>
                <div className="flex-1 space-y-3 mb-4 min-h-[40px]">
                  {filterCards(col.cards, col.name).map((card, idx) => (
                    <SortableItem key={card.id} id={card.id}>
                      <KanbanCard
                        title={card.title}
                        nameinbox={card.nameinbox}
                        value={card.value}
                        data_e_hora={card.data_e_hora}
                        status={card.status}
                        isDragging={activeCard === card.id}
                        account_id={card.account_id}
                        inbox_id={card.inbox_id}
                        id_conversa={card.id_conversa}
                        setModalOpen={setModalOpen}
                      />
                    </SortableItem>
                  ))}
                </div>
              </SortableContext>
            </DroppableColumn>
          ))}
        </div>
        {/* Só renderize Dropzones e DragOverlay se o modal NÃO estiver aberto */}
        {!modalOpen && (
          <>
            {activeCard && (
              <div className="fixed left-0 right-0 bottom-0 z-50 flex justify-center gap-8 pb-6 pointer-events-none select-none">
                <BottomDropZone id={DROPZONE_LOST} label="LOST" color="red" activeCard={activeCard} />
                <BottomDropZone id={DROPZONE_WON} label="WON" color="green" activeCard={activeCard} />
              </div>
            )}
            <DragOverlay dropAnimation={{ duration: 180 }}>
              {activeCard && (() => {
                const card = getActiveCardData();
                if (!card) return null;
                return (
                  <KanbanCard
                    title={card.title}
                    nameinbox={card.nameinbox}
                    value={card.value}
                    data_e_hora={card.data_e_hora}
                    status={card.status}
                    isDragging={true}
                    account_id={card.account_id}
                    inbox_id={card.inbox_id}
                    id_conversa={card.id_conversa}
                    setModalOpen={setModalOpen}
                  />
                );
              })()}
            </DragOverlay>
          </>
        )}
      </DndContext>
    </div>
  );
} 