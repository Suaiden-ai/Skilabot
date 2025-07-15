import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, useDroppable, DragOverlay } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Inbox, Phone, Calendar } from "lucide-react";
import { SortableItem } from "@/components/SortableItem";
import { supabase } from "@/integrations/supabase/client";

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
      style={{ minHeight: 200 }}
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
      const url = `https://smartchat.suaiden.com/app/accounts/${account_id}/inbox/${inbox_id}/conversations/${id_conversa}`;
      window.open(url, '_blank');
    } else {
      alert('Missing data to open the conversation!');
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
            className="bg-white rounded-lg shadow-lg p-6 min-w-[300px] flex flex-col items-center"
            onClick={e => e.stopPropagation()}
            onMouseDown={e => e.stopPropagation()}
            onPointerDown={e => e.stopPropagation()}
            onTouchStart={e => e.stopPropagation()}
          >
            <div className="font-semibold text-lg mb-2">Lead Options</div>
            {/* Removido os textos de debug dos IDs */}
            <button
              className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition flex items-center gap-2"
              onClick={handleGoToConversation}
              disabled={loadingSSO}
            >
              {loadingSSO ? (
                <span className="animate-spin mr-2 w-4 h-4 border-2 border-white border-t-blue-400 rounded-full"></span>
              ) : null}
              Go to conversation
            </button>
            <button
              className="text-gray-500 hover:text-gray-800 text-xs underline"
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
  const [columns, setColumns] = useState(initialColumns);
  const [newColName, setNewColName] = useState("");
  const sensors = useSensors(useSensor(PointerSensor));
  const [activeCard, setActiveCard] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Buscar leads do Supabase ao montar
  useEffect(() => {
    const fetchLeads = async () => {
      const { data, error } = await supabase
        .from('chatwoot_leads')
        .select('id, name_lead, phone_lead, status, nameinbox, data_e_hora, account_id, inbox_id, id_conversa');
      console.log('Leads do Supabase:', data);
      if (!error && Array.isArray(data)) {
        // Checagem defensiva para garantir que só processamos leads válidos
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
    fetchLeads();
  }, []);

  // Colunas fixas: não permitir adicionar ou remover

  // Add card to column
  const handleAddCard = (colId) => {
    const title = prompt("Card title:");
    if (title) {
      setColumns(columns.map(col =>
        col.id === colId
          ? { ...col, cards: [...col.cards, { id: `card-${Date.now()}`, title, value: "", status: col.name }] }
          : col
      ));
    }
  };

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
    if (overId === DROPZONE_WON || overId === DROPZONE_LOST) {
      // Encontrar o card e coluna
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
      // Remove do board
      setColumns(cols => cols.map((col, i) =>
        i === fromColIdx ? { ...col, cards: col.cards.filter((_, idx) => idx !== fromCardIdx) } : col
      ));
      // Atualiza status no Supabase
      const leadId = card.id.replace("lead-", "");
      const novoStatus = overId === DROPZONE_WON ? "ganho" : "perdido";
      await supabase
        .from("chatwoot_leads")
        .update({ status: novoStatus } as any)
        .eq("id", leadId);
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

  return (
    <div className={`min-h-screen bg-gray-50 py-10 px-4`}>
      <h1 className="text-3xl font-bold mb-8 text-center">KANBAN BOARD</h1>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
        <div className="flex gap-6 overflow-x-auto pb-4">
          {columns.map((col) => (
            <DroppableColumn key={col.id} col={col} isOver={activeCard && col.cards.length === 0}>
              <div className="flex items-center justify-between mb-4">
                <span className="font-semibold text-lg">{col.name}</span>
              </div>
              <SortableContext items={col.cards.map(card => card.id)} strategy={verticalListSortingStrategy}>
                <div className="flex-1 space-y-3 mb-4 min-h-[40px]">
                  {col.cards.map(card => (
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