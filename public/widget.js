(function() {
  'use strict';

  // Verificar se já existe um widget
  if (window.SkilabotWidget) {
    return;
  }

  // Configuração padrão
  const defaultConfig = {
    agentId: '',
    userId: '',
    primaryColor: '#ec4899',
    secondaryColor: '#f97316',
    position: 'bottom-right',
    showHeader: true,
    headerText: 'Chat with our team',
    welcomeMessage: 'Hello! How can I help you today?',
    enabled: true
  };

  // Mesclar configuração do usuário com padrão
  const config = { ...defaultConfig, ...window.SkilabotConfig };

  if (!config.enabled || !config.agentId) {
    return;
  }

  // Criar estilos CSS
  const createStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
      .skilabot-widget {
        position: fixed;
        z-index: 999999;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: 14px;
        line-height: 1.4;
      }

      .skilabot-widget.bottom-right {
        bottom: 20px;
        right: 20px;
      }

      .skilabot-widget.bottom-left {
        bottom: 20px;
        left: 20px;
      }

      .skilabot-widget.top-right {
        top: 20px;
        right: 20px;
      }

      .skilabot-widget.top-left {
        top: 20px;
        left: 20px;
      }

      .skilabot-widget-button {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        border: none;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 24px;
      }

      .skilabot-widget-button:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
      }

      .skilabot-widget-chat {
        position: fixed;
        width: 350px;
        height: 500px;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
        background: white;
        display: none;
        flex-direction: column;
        overflow: hidden;
        z-index: 999999;
      }

      .skilabot-widget-chat.open {
        display: flex;
      }

      .skilabot-widget-chat.bottom-right {
        bottom: 90px;
        right: 20px;
      }

      .skilabot-widget-chat.bottom-left {
        bottom: 90px;
        left: 20px;
      }

      .skilabot-widget-chat.top-right {
        top: 90px;
        right: 20px;
      }

      .skilabot-widget-chat.top-left {
        top: 90px;
        left: 20px;
      }

      .skilabot-widget-header {
        padding: 16px;
        background: linear-gradient(135deg, ${config.primaryColor}, ${config.secondaryColor});
        color: white;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .skilabot-widget-header h3 {
        margin: 0;
        font-size: 16px;
        font-weight: 600;
      }

      .skilabot-widget-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        font-size: 20px;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background-color 0.2s;
      }

      .skilabot-widget-close:hover {
        background-color: rgba(255, 255, 255, 0.2);
      }

      .skilabot-widget-messages {
        flex: 1;
        overflow-y: auto;
        padding: 16px;
        background: #f8f9fa;
      }

      .skilabot-widget-message {
        margin-bottom: 12px;
        display: flex;
        align-items: flex-start;
      }

      .skilabot-widget-message.user {
        justify-content: flex-end;
      }

      .skilabot-widget-message.bot {
        justify-content: flex-start;
      }

      .skilabot-widget-message-content {
        max-width: 80%;
        padding: 8px 12px;
        border-radius: 12px;
        word-wrap: break-word;
      }

      .skilabot-widget-message.user .skilabot-widget-message-content {
        background: linear-gradient(135deg, ${config.primaryColor}, ${config.secondaryColor});
        color: white;
      }

      .skilabot-widget-message.bot .skilabot-widget-message-content {
        background: white;
        color: #333;
        border: 1px solid #e1e5e9;
      }

      .skilabot-widget-input {
        padding: 16px;
        border-top: 1px solid #e1e5e9;
        background: white;
        display: flex;
        gap: 8px;
      }

      .skilabot-widget-input input {
        flex: 1;
        padding: 8px 12px;
        border: 1px solid #e1e5e9;
        border-radius: 20px;
        outline: none;
        font-size: 14px;
      }

      .skilabot-widget-input input:focus {
        border-color: ${config.primaryColor};
      }

      .skilabot-widget-send {
        background: linear-gradient(135deg, ${config.primaryColor}, ${config.secondaryColor});
        color: white;
        border: none;
        border-radius: 50%;
        width: 36px;
        height: 36px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.2s;
      }

      .skilabot-widget-send:hover {
        transform: scale(1.1);
      }

      .skilabot-widget-send:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
      }

      .skilabot-widget-typing {
        padding: 8px 12px;
        background: white;
        border: 1px solid #e1e5e9;
        border-radius: 12px;
        color: #666;
        font-style: italic;
        margin-bottom: 12px;
      }

      @media (max-width: 480px) {
        .skilabot-widget-chat {
          width: calc(100vw - 40px);
          height: calc(100vh - 120px);
          bottom: 20px !important;
          right: 20px !important;
          left: 20px !important;
          top: auto !important;
        }
      }
    `;
    return style;
  };

  // Criar ícone SVG
  const createIcon = () => {
    return `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
  };

  // Criar widget
  const createWidget = () => {
    const widget = document.createElement('div');
    widget.className = `skilabot-widget ${config.position}`;

    // Botão do widget
    const button = document.createElement('button');
    button.className = 'skilabot-widget-button';
    button.style.background = `linear-gradient(135deg, ${config.primaryColor}, ${config.secondaryColor})`;
    button.innerHTML = createIcon();
    button.setAttribute('aria-label', 'Open chat');
    button.setAttribute('title', config.headerText);

    // Chat container
    const chat = document.createElement('div');
    chat.className = `skilabot-widget-chat ${config.position}`;

    // Header
    const header = document.createElement('div');
    header.className = 'skilabot-widget-header';
    header.innerHTML = `
      <h3>${config.headerText}</h3>
      <button class="skilabot-widget-close" aria-label="Close chat">×</button>
    `;

    // Messages container
    const messages = document.createElement('div');
    messages.className = 'skilabot-widget-messages';

    // Input container
    const inputContainer = document.createElement('div');
    inputContainer.className = 'skilabot-widget-input';
    inputContainer.innerHTML = `
      <input type="text" placeholder="Type your message..." maxlength="500">
      <button class="skilabot-widget-send" aria-label="Send message">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    `;

    chat.appendChild(header);
    chat.appendChild(messages);
    chat.appendChild(inputContainer);
    widget.appendChild(button);
    widget.appendChild(chat);

    return { widget, button, chat, messages, inputContainer };
  };

  // Adicionar mensagem ao chat
  const addMessage = (messages, text, isUser = false) => {
    const message = document.createElement('div');
    message.className = `skilabot-widget-message ${isUser ? 'user' : 'bot'}`;
    
    const content = document.createElement('div');
    content.className = 'skilabot-widget-message-content';
    content.textContent = text;
    
    message.appendChild(content);
    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
  };

  // Mostrar indicador de digitação
  const showTyping = (messages) => {
    const typing = document.createElement('div');
    typing.className = 'skilabot-widget-typing';
    typing.textContent = 'Typing...';
    typing.id = 'skilabot-typing';
    messages.appendChild(typing);
    messages.scrollTop = messages.scrollHeight;
  };

  // Remover indicador de digitação
  const hideTyping = () => {
    const typing = document.getElementById('skilabot-typing');
    if (typing) {
      typing.remove();
    }
  };

  // Enviar mensagem
  const sendMessage = async (text, messages, sendButton) => {
    if (!text.trim()) return;

    addMessage(messages, text, true);
    sendButton.disabled = true;

    showTyping(messages);

    try {
                        const response = await fetch(`${window.location.origin}/api/webhook/chatbot-dashboard`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([{
          headers: {
            "content-type": "application/json",
            "user-agent": navigator.userAgent,
            "accept": "*/*",
            "accept-language": navigator.language
          },
          params: {},
          query: {},
          body: {
            message: text,
            agent_id: config.agentId,
            agent_name: config.headerText,
            company_name: config.headerText,
            conversation_id: `widget_${Date.now()}`,
            user_id: config.userId,
            final_prompt: null
          },
                                webhookUrl: `${window.location.origin}/api/webhook/chatbot-dashboard`,
          executionMode: "production"
        }])
      });

      hideTyping();

      if (response.ok) {
        const responseData = await response.text();
        let botResponse;
        
        try {
          const jsonResponse = JSON.parse(responseData);
          if (typeof jsonResponse === 'string' && jsonResponse.includes('{"output":')) {
            try {
              const outputJson = JSON.parse(jsonResponse);
              botResponse = outputJson.output;
            } catch {
              botResponse = jsonResponse;
            }
          } else {
            botResponse = jsonResponse.response || jsonResponse.message || jsonResponse.output || responseData;
          }
        } catch (e) {
          if (responseData.includes('{"output":')) {
            try {
              const outputJson = JSON.parse(responseData);
              botResponse = outputJson.output;
            } catch {
              botResponse = responseData;
            }
          } else {
            botResponse = responseData;
          }
        }

        addMessage(messages, botResponse || 'Sorry, I could not process your message.', false);
      } else {
        addMessage(messages, 'Sorry, there was an error processing your message.', false);
      }
    } catch (error) {
      hideTyping();
      addMessage(messages, 'Sorry, there was an error connecting to the chat service.', false);
    } finally {
      sendButton.disabled = false;
    }
  };

  // Inicializar widget
  const initWidget = () => {
    // Adicionar estilos
    const style = createStyles();
    document.head.appendChild(style);

    // Criar widget
    const { widget, button, chat, messages, inputContainer } = createWidget();
    document.body.appendChild(widget);

    // Adicionar mensagem de boas-vindas
    addMessage(messages, config.welcomeMessage, false);

    // Event listeners
    button.addEventListener('click', () => {
      chat.classList.add('open');
      button.style.display = 'none';
    });

    const closeButton = chat.querySelector('.skilabot-widget-close');
    closeButton.addEventListener('click', () => {
      chat.classList.remove('open');
      button.style.display = 'flex';
    });

    const input = inputContainer.querySelector('input');
    const sendButton = inputContainer.querySelector('.skilabot-widget-send');

    const handleSend = () => {
      const text = input.value.trim();
      if (text) {
        input.value = '';
        sendMessage(text, messages, sendButton);
      }
    };

    sendButton.addEventListener('click', handleSend);
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        handleSend();
      }
    });

    // Focar no input quando o chat abrir
    button.addEventListener('click', () => {
      setTimeout(() => input.focus(), 100);
    });
  };

  // Inicializar quando o DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWidget);
  } else {
    initWidget();
  }

  // Expor widget globalmente
  window.SkilabotWidget = {
    config,
    initWidget
  };
})(); 