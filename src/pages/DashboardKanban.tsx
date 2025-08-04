import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, useDroppable, DragOverlay } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Inbox, Phone, Calendar, CheckCircle, XCircle, TrendingUp, MessageCircle, Trophy, Edit3, Save, X, Tag, Flag, Clock, User, Filter, BarChart3, Settings, Eye, EyeOff } from "lucide-react";
import { SortableItem } from "@/components/SortableItem";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { parseISO, isThisWeek, isThisMonth, parse } from "date-fns";
import { useAuth } from "@/contexts/AuthContext";
import { usePageTitle } from "@/hooks/usePageTitle";

type Lead = {
  id: string; // UUID único do registro
  account_id: string; // ID do usuário/account
  name_lead: string;
  phone_lead: string;
  status?: string;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  labels?: string[];
  assignee?: string;
  due_date?: string;
  estimated_time?: number; // em horas
  actual_time?: number; // em horas
  nameinbox?: string;
  data_e_hora?: string;
  inbox_id?: string;
  id_conversa?: string;
};

// Cores para etiquetas
const labelColors = {
  'hot': 'bg-red-100 text-red-800 border-red-200',
  'cold': 'bg-blue-100 text-blue-800 border-blue-200',
  'qualified': 'bg-green-100 text-green-800 border-green-200',
  'unqualified': 'bg-gray-100 text-gray-800 border-gray-200',
  'vip': 'bg-purple-100 text-purple-800 border-purple-200',
  'follow-up': 'bg-orange-100 text-orange-800 border-orange-200',
  'urgent': 'bg-red-500 text-white border-red-600',
  'new': 'bg-green-500 text-white border-green-600',
};

// Cores para prioridades
const priorityColors = {
  'low': 'bg-gray-100 text-gray-700 border-gray-200',
  'medium': 'bg-yellow-100 text-yellow-700 border-yellow-200',
  'high': 'bg-orange-100 text-orange-700 border-orange-200',
  'urgent': 'bg-red-100 text-red-700 border-red-200',
};

const initialColumns = [
  { id: "col-1", name: "Lead", cards: [] },
  { id: "col-2", name: "Contacted", cards: [] },
  { id: "col-3", name: "Proposal", cards: [] },
  { id: "col-4", name: "Closed", cards: [] },
];

function DroppableColumn({ col, children, isOver, onEditColumn, editingColumn, setEditingColumn, editColumnName, setEditColumnName, onSaveColumnEdit, onCancelColumnEdit, onDeleteColumn }) {
  const { setNodeRef, isOver: over } = useDroppable({ id: col.id });
  const isEditing = editingColumn === col.id;
  
  return (
    <div
              ref={setNodeRef}
        className={`bg-white border border-gray-200 rounded-lg shadow-sm p-4 min-w-[260px] flex flex-col transition-all duration-200 kanban-column ${over || isOver ? 'ring-2 ring-blue-400 bg-blue-50' : 'hover:shadow-md'}`}
        style={{ height: 'calc(100vh - 380px)', overflowY: 'auto' }}
    >
      <div className="flex items-center justify-between mb-4">
        {isEditing ? (
          <div className="flex items-center gap-2 flex-1">
            <input
              type="text"
              value={editColumnName}
              onChange={(e) => setEditColumnName(e.target.value)}
              className="flex-1 px-3 py-2 text-base font-semibold text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onSaveColumnEdit(col.id);
                } else if (e.key === 'Escape') {
                  onCancelColumnEdit();
                }
              }}
            />
            <button
              onClick={() => onSaveColumnEdit(col.id)}
              className="p-1.5 text-green-600 hover:text-green-700 hover:bg-green-100 rounded"
              title="Save"
            >
              <Save className="w-4 h-4" />
            </button>
            <button
              onClick={onCancelColumnEdit}
              className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
              title="Cancel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900">{col.name}</span>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {children.props.children.length}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => onEditColumn(col.id, col.name)}
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
                title="Edit column name"
              >
                <Edit3 className="w-3 h-3" />
              </button>
              {col.id !== "col-1" && col.id !== "col-2" && col.id !== "col-3" && col.id !== "col-4" && (
                <button
                  onClick={() => onDeleteColumn(col.id)}
                  className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-100 rounded"
                  title="Delete column"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              )}
            </div>
          </>
        )}
      </div>
      {children}
    </div>
  );
}

function BottomDropZone({ id, label, color, activeCard }) {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <div
      ref={setNodeRef}
      className={`w-48 sm:w-72 h-16 sm:h-24 border-2 rounded-xl flex items-center justify-center text-sm sm:text-xl font-bold shadow-lg pointer-events-auto transition-all duration-200 hover:scale-105 select-none ${
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
function KanbanCard({ 
  title, 
  nameinbox, 
  value, 
  data_e_hora, 
  status, 
  isDragging, 
  account_id, 
  inbox_id, 
  id_conversa, 
  setModalOpen,
  priority,
  labels,
  assignee,
  due_date,
  estimated_time,
  actual_time,
  showLabels = true,
  showPriority = true,
  showAssignee = true,
  showTimeTracking = true,
  compactView = false,
  onEditLead
}: {
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
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  labels?: string[];
  assignee?: string;
  due_date?: string;
  estimated_time?: number;
  actual_time?: number;
  showLabels?: boolean;
  showPriority?: boolean;
  showAssignee?: boolean;
  showTimeTracking?: boolean;
  compactView?: boolean;
  onEditLead?: (lead: any) => void;
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
        className={`bg-white ${isDragging ? 'border-2 shadow-2xl scale-105 opacity-95' : 'border border-gray-200 shadow-sm'} rounded-lg p-2 sm:p-3 flex flex-col gap-1 relative transition-all duration-300 hover:shadow-md hover:scale-[1.02] animate-fadein hover:bg-gray-50`}
        style={{
          animation: 'fadein 0.6s',
          pointerEvents: isDragging ? 'none' : undefined,
          minWidth: isDragging ? 200 : undefined,
        }}
      >
        {/* Header com prioridade e botão de opções */}
        <div className="flex justify-between items-start mb-2">
          <div className="font-medium text-gray-900 text-xs sm:text-sm flex-1 pr-2">{title}</div>
          <div className="flex items-center gap-1">
            {showPriority && priority && (
              <div className={`px-1.5 py-0.5 rounded-full text-xs font-medium border ${priorityColors[priority]}`}>
                <Flag className="w-2.5 h-2.5 inline mr-1" />
                {priority}
              </div>
            )}
            <button
              className="p-1 rounded hover:bg-gray-200 flex-shrink-0"
              onClick={e => {
                e.stopPropagation();
                handleOpen();
              }}
              onMouseDown={e => e.stopPropagation()}
              onPointerDown={e => e.stopPropagation()}
              onTouchStart={e => e.stopPropagation()}
              data-dnd-kit-no-drag
              title="Opções"
              type="button"
            >
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>
            </button>
          </div>
        </div>

        {/* Etiquetas */}
        {showLabels && labels && labels.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {labels.slice(0, 3).map((label, index) => (
              <span
                key={index}
                className={`px-1.5 py-0.5 rounded-full text-xs font-medium border ${labelColors[label] || 'bg-gray-100 text-gray-800 border-gray-200'}`}
              >
                <Tag className="w-2.5 h-2.5 inline mr-1" />
                {label}
              </span>
            ))}
            {labels.length > 3 && (
              <span className="px-1.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                +{labels.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Informações principais */}
        {nameinbox && (
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <Inbox className="w-3 h-3 text-gray-400" />
            <span className="truncate"><b>Inbox:</b> {nameinbox}</span>
          </div>
        )}
        {value && (
          <div className="flex items-center gap-1 text-xs text-blue-600">
            <Phone className="w-3 h-3 text-blue-400" />
            <span className="truncate"><b>Phone:</b> {value}</span>
          </div>
        )}
        {data_e_hora && (
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Calendar className="w-3 h-3 text-gray-400" />
            <span className="truncate"><b>Date:</b> {data_e_hora}</span>
          </div>
        )}
        {/* Assignee */}
        {showAssignee && assignee && (
          <div className="flex items-center gap-1 text-xs text-purple-600">
            <User className="w-3 h-3 text-purple-400" />
            <span className="truncate"><b>Assigned:</b> {assignee}</span>
          </div>
        )}
        {/* Due date */}
        {due_date && (
          <div className="flex items-center gap-1 text-xs text-orange-600">
            <Clock className="w-3 h-3 text-orange-400" />
            <span className="truncate"><b>Due:</b> {due_date}</span>
          </div>
        )}

        {/* Status */}
        {status && <div className="text-xs text-gray-500 mt-1">{status}</div>}
      </div>
      {showDialog && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-40 pointer-events-auto p-4"
          onClick={handleClose}
          onMouseDown={handleClose}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 min-w-[280px] sm:min-w-[320px] flex flex-col items-center relative max-w-xs w-full"
            onClick={e => e.stopPropagation()}
            onMouseDown={e => e.stopPropagation()}
            onPointerDown={e => e.stopPropagation()}
            onTouchStart={e => e.stopPropagation()}
          >
            <MessageCircle className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500 mb-2" />
            <div className="font-bold text-lg sm:text-xl mb-2 text-center">Lead Options</div>
            <div className="w-full flex flex-col items-center mb-4">
              <div className="bg-blue-50 text-blue-800 px-3 py-2 rounded-lg text-xs sm:text-sm text-center mb-2">
                Are you already logged in? <br />If not, please <button onClick={handleSsoLogin} className='text-blue-600 underline hover:text-blue-800 font-semibold' disabled={loadingSSO}>{loadingSSO ? 'Loading...' : 'log in here'}</button>.
              </div>
            </div>
            <button
              className="mb-3 w-full px-3 sm:px-4 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 text-sm sm:text-base font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={handleGoToConversation}
              disabled={loadingSSO}
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              Go to conversation
            </button>
            <button
              className="mb-3 w-full px-3 sm:px-4 py-2 sm:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2 text-sm sm:text-base font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              onClick={() => {
                if (onEditLead) {
                  onEditLead({
                    account_id: account_id, // Passar o account_id para identificação
                    title,
                    value,
                    priority,
                    labels,
                    assignee,
                    due_date,
                    estimated_time,
                    actual_time
                  });
                }
                handleClose({ stopPropagation: () => {} });
              }}
            >
              <Edit3 className="w-4 h-4 sm:w-5 sm:h-5" />
              Edit Lead
            </button>
            <button
              className="text-gray-400 hover:text-gray-700 text-xs underline absolute right-3 sm:right-4 bottom-3 sm:bottom-4"
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
  const { user } = useAuth();
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
  const [priorityFilter, setPriorityFilter] = useState("all"); // all, low, medium, high, urgent
  const [labelFilter, setLabelFilter] = useState("all"); // all, hot, cold, qualified, etc.
  const [assigneeFilter, setAssigneeFilter] = useState("all"); // all, specific assignee
  const [showLabels, setShowLabels] = useState(true);
  const [showPriority, setShowPriority] = useState(true);
  const [showAssignee, setShowAssignee] = useState(true);
  const [showTimeTracking, setShowTimeTracking] = useState(true);
  const [compactView, setCompactView] = useState(false);
  
  // Column editing state
  const [editingColumn, setEditingColumn] = useState(null);
  const [editColumnName, setEditColumnName] = useState("");
  
  // New column creation state
  const [showNewColumnModal, setShowNewColumnModal] = useState(false);
  const [newColumnName, setNewColumnName] = useState("");
  
  // Lead editing state
  const [showEditLeadModal, setShowEditLeadModal] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [editLeadData, setEditLeadData] = useState({
    name_lead: '',
    phone_lead: '',
    priority: 'medium',
    labels: [],
    assignee: '',
    due_date: '',
    estimated_time: 0,
    actual_time: 0
  });
  
  // Scroll indicator state
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  
  // Handler para detectar scroll e esconder indicador
  const handleScroll = () => {
    setShowScrollIndicator(false);
  };

  // Função para editar coluna
  const handleEditColumn = (columnId, currentName) => {
    setEditingColumn(columnId);
    setEditColumnName(currentName);
  };

  // Função para salvar edição da coluna
  const handleSaveColumnEdit = async (columnId) => {
    if (editColumnName.trim()) {
      // Atualizar no estado local
      setColumns(cols => cols.map(col => 
        col.id === columnId 
          ? { ...col, name: editColumnName.trim() }
          : col
      ));
      
      // Por enquanto, apenas salvar no estado local
      // TODO: Implementar persistência no Supabase quando a tabela estiver disponível
      console.log('Coluna editada:', columnId, editColumnName.trim());
      
      setEditingColumn(null);
      setEditColumnName("");
    }
  };

  // Função para cancelar edição da coluna
  const handleCancelColumnEdit = () => {
    setEditingColumn(null);
    setEditColumnName("");
  };

  // Função para criar nova coluna
  const handleCreateNewColumn = async () => {
    if (newColumnName.trim()) {
      const newColumnId = `col-${Date.now()}`;
      const newColumn = {
        id: newColumnId,
        name: newColumnName.trim(),
        cards: []
      };
      
      // Adicionar ao estado local
      setColumns(cols => [...cols, newColumn]);
      
      // Por enquanto, apenas salvar no estado local
      // TODO: Implementar persistência no Supabase quando a tabela estiver disponível
      console.log('Nova coluna criada:', newColumn);
      
      setNewColumnName("");
      setShowNewColumnModal(false);
    }
  };

  // Função para deletar coluna
  const handleDeleteColumn = async (columnId) => {
    if (window.confirm("Are you sure you want to delete this column? All cards in this column will be lost.")) {
      // Remover do estado local
      setColumns(cols => cols.filter(col => col.id !== columnId));
      
      // Por enquanto, apenas remover do estado local
      // TODO: Implementar persistência no Supabase quando a tabela estiver disponível
      console.log('Coluna deletada:', columnId);
    }
  };

  // Função para abrir modal de edição de lead
  const handleEditLead = (lead) => {
    console.log('Editing lead:', lead);
    setEditingLead(lead);
    setEditLeadData({
      name_lead: lead.title || '',
      phone_lead: lead.value || '',
      priority: lead.priority || 'medium',
      labels: lead.labels || [],
      assignee: lead.assignee || '',
      due_date: lead.due_date || '',
      estimated_time: lead.estimated_time || 0,
      actual_time: lead.actual_time || 0
    });
    setShowEditLeadModal(true);
  };

  // Função para salvar edição de lead
  const handleSaveLeadEdit = async () => {
    if (!editingLead) return;
    
    try {
      // Preparar dados para atualização (todos os campos agora disponíveis)
      const updateData = {
        name_lead: editLeadData.name_lead,
        phone_lead: editLeadData.phone_lead,
        priority: editLeadData.priority,
        labels: editLeadData.labels,
        assignee: editLeadData.assignee || null,
        due_date: editLeadData.due_date || null,
        estimated_time: editLeadData.estimated_time || 0,
        actual_time: editLeadData.actual_time || 0
      };
      
      console.log('Updating lead with data:', updateData);
      console.log('Account ID:', editingLead.account_id);
      console.log('Phone Lead:', editingLead.value);
      
      // Atualizar no Supabase usando account_id para identificar a linha
      const { data: updateResult, error } = await supabase
        .from('chatwoot_leads')
        .update(updateData)
        .eq('account_id', editingLead.account_id)
        .eq('phone_lead', editingLead.value) // Usar editingLead.value que é o phone_lead
        .select(); // Retornar os dados atualizados
      
      console.log('Update result:', updateResult);
      console.log('Update error:', error);
      
      if (error) {
        console.error('Error updating lead:', error);
        alert(`Error updating lead: ${error.message}`);
        return;
      }
      
      // Atualizar estado local
      setColumns(cols => cols.map(col => ({
        ...col,
        cards: col.cards.map(card => 
          card.id === editingLead.id 
            ? {
                ...card,
                title: editLeadData.name_lead,
                value: editLeadData.phone_lead,
                // Manter os novos campos no estado local mesmo que não estejam na DB ainda
                priority: editLeadData.priority,
                labels: editLeadData.labels,
                assignee: editLeadData.assignee,
                due_date: editLeadData.due_date,
                estimated_time: editLeadData.estimated_time,
                actual_time: editLeadData.actual_time
              }
            : card
        )
      })));
      
      setShowEditLeadModal(false);
      setEditingLead(null);
      setEditLeadData({
        name_lead: '',
        phone_lead: '',
        priority: 'medium',
        labels: [],
        assignee: '',
        due_date: '',
        estimated_time: 0,
        actual_time: 0
      });
      
      // Recarregar leads
      await fetchLeads();
      
      // Log para debug
      console.log('Lead updated successfully. Refreshing data...');
    } catch (error) {
      console.error('Error updating lead:', error);
      alert(`Error updating lead: ${error.message}`);
    }
  };

    // Função para buscar leads do Supabase
  const fetchLeads = async () => {
    try {
      console.log('Fetching leads from Supabase...');
      const { data, error } = await supabase
        .from('chatwoot_leads')
        .select('id, name_lead, phone_lead, status, nameinbox, data_e_hora, account_id, inbox_id, id_conversa, priority, labels, assignee, due_date, estimated_time, actual_time');
      
      if (error) {
        console.error('Error fetching leads:', error);
        return;
      }
      
      if (!Array.isArray(data)) {
        console.error('Invalid data format:', data);
        return;
      }
      
      console.log('Raw data from Supabase:', data);
      
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
      const mappedLeads = leads
        .filter(lead => (!lead.status || lead.status === "Lead") && lead.phone_lead !== "+123456")
        .map(lead => ({
          id: lead.id, // UUID único do registro
          account_id: lead.account_id, // ID do usuário/account
          title: lead.name_lead,
          value: lead.phone_lead,
          status: lead.status || "New Lead",
          nameinbox: lead.nameinbox,
          data_e_hora: lead.data_e_hora,
          inbox_id: lead.inbox_id,
          id_conversa: lead.id_conversa,
          priority: lead.priority,
          labels: lead.labels,
          assignee: lead.assignee,
          due_date: lead.due_date,
          estimated_time: lead.estimated_time,
          actual_time: lead.actual_time
        }));
      
      console.log('Mapped leads:', mappedLeads);
      
      setColumns(cols => cols.map(col =>
        col.name === "Lead"
          ? { ...col, cards: mappedLeads }
          : col
      ));
    } catch (error) {
      console.error('Error in fetchLeads:', error);
    }
  };

  // Função auxiliar para parsear datas em múltiplos formatos
  function parseLeadDate(dateStr) {
    if (!dateStr) return null;
    let date = parseISO(dateStr);
    if (isNaN(date.getTime())) {
      // Tenta formato brasileiro: dd/MM/yyyy, HH:mm:ss
      try {
        date = parse(dateStr, 'dd/MM/yyyy, HH:mm:ss', new Date());
      } catch {}
    }
    return isNaN(date.getTime()) ? null : date;
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
    // Priority filter
    if (priorityFilter !== "all") {
      filtered = filtered.filter(card => card.priority === priorityFilter);
    }
    // Label filter
    if (labelFilter !== "all") {
      filtered = filtered.filter(card => card.labels && card.labels.includes(labelFilter));
    }
    // Assignee filter
    if (assigneeFilter !== "all") {
      filtered = filtered.filter(card => card.assignee === assigneeFilter);
    }
    // Search filter
    if (search.trim()) {
      const s = search.trim().toLowerCase();
      filtered = filtered.filter(card =>
        (card.title && card.title.toLowerCase().includes(s)) ||
        (card.value && card.value.toLowerCase().includes(s)) ||
        (card.assignee && card.assignee.toLowerCase().includes(s))
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

  // Função para carregar colunas salvas
  const loadSavedColumns = async () => {
    if (!user) return;
    
    // Por enquanto, usar colunas padrão
    // TODO: Implementar persistência no Supabase quando a tabela estiver disponível
    const defaultColumns = [
      { id: "col-1", name: "Lead", cards: [] },
      { id: "col-2", name: "Contacted", cards: [] },
      { id: "col-3", name: "Proposal", cards: [] },
      { id: "col-4", name: "Closed", cards: [] },
    ];
    
    setColumns(defaultColumns);
  };

  // Buscar leads ao montar
  useEffect(() => {
    fetchLeads();
    loadSavedColumns();
  }, [user]);

  // Esconder indicador de scroll após 5 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowScrollIndicator(false);
    }, 5000);
    
    return () => clearTimeout(timer);
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
    <div className="w-full h-full bg-white flex flex-col overflow-hidden">
      {/* Header Unificado */}
      <div className="bg-white border-b border-gray-200 px-4 lg:px-8 py-6 pl-16 lg:pl-20">
        <div className="max-w-full mx-auto">
          {/* Título e Status */}
          <div className="flex items-center justify-between mb-6">
            <div className="ml-4">
              <h1 className="text-2xl font-semibold text-gray-900">Kanban Board</h1>
              <p className="text-base text-gray-500 mt-1">Manage your leads visually</p>
            </div>
            <div className="flex items-center gap-4">
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">

        {/* Search and Filters */}
        <div className="bg-white border-b border-gray-200 px-4 lg:px-8 py-4 pl-16 lg:pl-20">
          <div className="max-w-full mx-auto">
            {/* Filtros e Métricas */}
            <div className="flex items-center gap-4">
              {/* Filtros */}
              <div className="w-64 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search leads..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="Lead">Lead</option>
                <option value="Contacted">Contacted</option>
                <option value="Proposal">Proposal</option>
                <option value="Closed">Closed</option>
              </select>
              <select
                value={priorityFilter}
                onChange={e => setPriorityFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Priorities</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
              <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setShowLabels(!showLabels)}
                  className={`p-1.5 rounded text-xs font-medium transition-all ${showLabels ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-600 hover:text-gray-800'}`}
                  title="Show/Hide Labels"
                >
                  <Tag className="w-3 h-3" />
                </button>
                <button
                  onClick={() => setShowPriority(!showPriority)}
                  className={`p-1.5 rounded text-xs font-medium transition-all ${showPriority ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-600 hover:text-gray-800'}`}
                  title="Show/Hide Priority"
                >
                  <Flag className="w-3 h-3" />
                </button>
                <button
                  onClick={() => setShowAssignee(!showAssignee)}
                  className={`p-1.5 rounded text-xs font-medium transition-all ${showAssignee ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-600 hover:text-gray-800'}`}
                  title="Show/Hide Assignee"
                >
                  <User className="w-3 h-3" />
                </button>
              </div>
              
              {/* Métricas */}
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900">{wonFiltered.length}</div>
                    <div className="text-xs text-gray-500">Won</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                    <XCircle className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900">{lostFiltered.length}</div>
                    <div className="text-xs text-gray-500">Lost</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900">{activeLeads}</div>
                    <div className="text-xs text-gray-500">Active</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        
        {/* Modal para criar nova coluna */}
        <Dialog open={showNewColumnModal} onOpenChange={setShowNewColumnModal}>
          <DialogContent className="max-w-md rounded-2xl shadow-2xl p-4 sm:p-6">
            <DialogHeader>
              <DialogTitle className="text-lg sm:text-xl font-bold text-gray-800 flex items-center gap-2">
                <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-pink-500" />
                Create New Column
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label htmlFor="newColumnName" className="block text-sm font-medium text-gray-700 mb-2">
                  Column Name
                </label>
                <input
                  id="newColumnName"
                  type="text"
                  value={newColumnName}
                  onChange={(e) => setNewColumnName(e.target.value)}
                  placeholder="Enter column name..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm sm:text-base"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleCreateNewColumn();
                    } else if (e.key === 'Escape') {
                      setShowNewColumnModal(false);
                    }
                  }}
                />
              </div>
              <div className="flex justify-end gap-2 sm:gap-3">
                <button
                  onClick={() => setShowNewColumnModal(false)}
                  className="px-3 sm:px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateNewColumn}
                  disabled={!newColumnName.trim()}
                  className="px-3 sm:px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
                >
                  Create Column
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showListModal} onOpenChange={setShowListModal}>
          <DialogContent className="max-w-lg rounded-2xl shadow-2xl p-0 overflow-hidden">
            <div className="flex flex-col w-full">
              <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-pink-50 to-orange-100 py-4 sm:py-5 px-4 sm:px-6 border-b relative">
                {listType === 'won' ? (
                  <Trophy className="w-6 h-6 sm:w-7 sm:h-7 text-yellow-500" />
                ) : (
                  <XCircle className="w-6 h-6 sm:w-7 sm:h-7 text-red-500" />
                )}
                <span className="text-lg sm:text-2xl font-bold text-pink-900 tracking-tight">
                  {listType === 'won' ? 'WON Leads' : 'LOST Leads'}
                </span>
                {/* Remover botão customizado de fechar (X) aqui */}
              </div>
              <div className="flex gap-1 sm:gap-2 mb-3 sm:mb-4 px-4 sm:px-6 pt-3 sm:pt-4">
                <button onClick={() => setLeadFilter('all')} className={`px-2 sm:px-4 py-1 sm:py-2 rounded-full font-medium transition-all text-xs sm:text-sm ${leadFilter === 'all' ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-pink-100'}`}>All</button>
                <button onClick={() => setLeadFilter('week')} className={`px-2 sm:px-4 py-1 sm:py-2 rounded-full font-medium transition-all text-xs sm:text-sm ${leadFilter === 'week' ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-pink-100'}`}>This week</button>
                <button onClick={() => setLeadFilter('month')} className={`px-2 sm:px-4 py-1 sm:py-2 rounded-full font-medium transition-all text-xs sm:text-sm ${leadFilter === 'month' ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-pink-100'}`}>This month</button>
              </div>
              <div className="max-h-80 sm:max-h-96 overflow-y-auto px-4 sm:px-6 pb-4 sm:pb-6">
                <table className="w-full text-xs sm:text-sm rounded-xl overflow-hidden">
                  <thead>
                    <tr className="border-b bg-pink-50 text-pink-900">
                      <th className="text-left py-2 sm:py-3 px-1 sm:px-2 font-semibold">Name</th>
                      <th className="text-left py-2 sm:py-3 px-1 sm:px-2 font-semibold">Phone</th>
                      <th className="text-left py-2 sm:py-3 px-1 sm:px-2 font-semibold">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedLeads.map((lead, idx) => (
                      <tr key={lead.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-pink-50'}>
                        <td className="py-1 sm:py-2 px-1 sm:px-2 font-medium text-gray-800">{lead.name_lead}</td>
                        <td className="py-1 sm:py-2 px-1 sm:px-2 text-blue-700 font-mono">{lead.phone_lead}</td>
                        <td className="py-1 sm:py-2 px-1 sm:px-2 text-gray-500">{lead.data_e_hora || '-'}</td>
                      </tr>
                    ))}
                    {paginatedLeads.length === 0 && (
                      <tr><td colSpan={3} className="text-center py-4 sm:py-6 text-gray-400">No leads found.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
              {/* Pagination */}
              {leadsToShow.length > 5 && (
                <div className="flex justify-between items-center mt-2 px-4 sm:px-6 pb-3 sm:pb-4">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className={`px-3 sm:px-4 py-1 sm:py-2 rounded-full font-medium text-xs sm:text-sm ${page === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                  >Previous</button>
                  <span className="text-xs sm:text-sm text-gray-700">Page {page} of {totalPages}</span>
                  <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className={`px-3 sm:px-4 py-1 sm:py-2 rounded-full font-medium text-xs sm:text-sm ${page === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                  >Next</button>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
        
        {/* Modal de edição de lead */}
        <Dialog open={showEditLeadModal} onOpenChange={setShowEditLeadModal}>
          <DialogContent className="max-w-2xl rounded-2xl shadow-2xl p-6">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-pink-500" />
                Edit Lead
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {/* Informações básicas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={editLeadData.name_lead}
                    onChange={(e) => setEditLeadData({...editLeadData, name_lead: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="text"
                    value={editLeadData.phone_lead}
                    onChange={(e) => setEditLeadData({...editLeadData, phone_lead: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                  />
                </div>
              </div>
              
              {/* Prioridade e Assignee */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select
                    value={editLeadData.priority}
                    onChange={(e) => setEditLeadData({...editLeadData, priority: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Assignee</label>
                  <select
                    value={editLeadData.assignee}
                    onChange={(e) => setEditLeadData({...editLeadData, assignee: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                  >
                    <option value="">Unassigned</option>
                    <option value="John Doe">John Doe</option>
                    <option value="Jane Smith">Jane Smith</option>
                    <option value="Mike Johnson">Mike Johnson</option>
                  </select>
                </div>
              </div>
              
              {/* Due date e labels */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                  <input
                    type="date"
                    value={editLeadData.due_date}
                    onChange={(e) => setEditLeadData({...editLeadData, due_date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Labels</label>
                  <select
                    multiple
                    value={editLeadData.labels}
                    onChange={(e) => {
                      const selected = Array.from(e.target.selectedOptions, option => option.value);
                      setEditLeadData({...editLeadData, labels: selected});
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                  >
                    <option value="hot">Hot</option>
                    <option value="cold">Cold</option>
                    <option value="qualified">Qualified</option>
                    <option value="unqualified">Unqualified</option>
                    <option value="vip">VIP</option>
                    <option value="follow-up">Follow-up</option>
                    <option value="urgent">Urgent</option>
                    <option value="new">New</option>
                  </select>
                </div>
              </div>
              

              
              {/* Botões */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => setShowEditLeadModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveLeadEdit}
                  className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        
        {/* Kanban Board */}
        <div className="flex-1 bg-white p-2 lg:p-4 pl-16 lg:pl-20 overflow-hidden">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
            <div className="h-full max-w-full mx-auto overflow-hidden">
              <div 
                className="flex gap-4 h-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
                onScroll={handleScroll}
              >
              {columns.map((col) => (
                <DroppableColumn 
                  key={col.id} 
                  col={col} 
                  isOver={activeCard && col.cards.length === 0}
                  onEditColumn={handleEditColumn}
                  editingColumn={editingColumn}
                  setEditingColumn={setEditingColumn}
                  editColumnName={editColumnName}
                  setEditColumnName={setEditColumnName}
                  onSaveColumnEdit={handleSaveColumnEdit}
                  onCancelColumnEdit={handleCancelColumnEdit}
                  onDeleteColumn={handleDeleteColumn}
                >
                  <SortableContext items={col.cards.map(card => card.id)} strategy={verticalListSortingStrategy}>
                    <div className="flex-1 space-y-2 sm:space-y-3 mb-3 sm:mb-4 min-h-[40px]">
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
                            priority={card.priority}
                            labels={card.labels}
                            assignee={card.assignee}
                            due_date={card.due_date}
                            estimated_time={card.estimated_time}
                            actual_time={card.actual_time}
                            showLabels={showLabels}
                            showPriority={showPriority}
                            showAssignee={showAssignee}
                            showTimeTracking={showTimeTracking}
                            compactView={compactView}
                            onEditLead={handleEditLead}
                          />
                        </SortableItem>
                      ))}
                    </div>
                  </SortableContext>
                </DroppableColumn>
              ))}
              
              {/* Add New Column Button */}
              <div className="bg-transparent border-none rounded-lg shadow-none p-1 min-w-[260px] flex flex-col transition-all duration-200 kanban-column" style={{ height: 'calc(100vh - 380px)', overflowY: 'auto' }}>
                <div className="flex-1 flex items-center justify-center">
                  <button
                    onClick={() => setShowNewColumnModal(true)}
                    className="w-full h-full border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 hover:text-blue-500 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group bg-white"
                  >
                    <Plus className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">Add Column</span>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Só renderize Dropzones e DragOverlay se o modal NÃO estiver aberto */}
            {!modalOpen && (
              <>
                {activeCard && (
                  <div className="fixed left-0 right-0 bottom-0 z-50 flex justify-center gap-4 sm:gap-8 pb-4 sm:pb-6 pointer-events-none select-none">
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
          </div>
        </DndContext>
        </div>
      </div>
    </div>
  );
} 