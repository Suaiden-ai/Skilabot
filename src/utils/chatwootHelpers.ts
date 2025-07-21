// Função para gerar senha do Chatwoot baseada em email+telefone
export const generateChatwootPassword = (email: string, phone?: string): string => {
  const baseString = `${email}${phone || ''}`;
  const base64String = btoa(baseString);
  let password = base64String.substring(0, 10);

  const specialChars = "!@#$%&*";
  const numbers = "0123456789";

  // Garante pelo menos um número
  if (!/[0-9]/.test(password)) {
    const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
    // Insere o número em uma posição aleatória
    const pos = Math.floor(Math.random() * password.length);
    password = password.slice(0, pos) + randomNumber + password.slice(pos + 1);
  }

  // Garante pelo menos um caractere especial
  if (!/[!@#$%&*]/.test(password)) {
    const randomSpecial = specialChars[Math.floor(Math.random() * specialChars.length)];
    // Insere o especial em uma posição aleatória diferente da do número
    let pos = Math.floor(Math.random() * password.length);
    // Se a posição for igual à do número, muda para a próxima
    if (password.length > 1 && password[pos].match(/[0-9]/)) {
      pos = (pos + 1) % password.length;
    }
    password = password.slice(0, pos) + randomSpecial + password.slice(pos + 1);
  }

  return password;
};

// Função para criar conta no Chatwoot via webhook
export const createChatwootAccount = async (userData: {
  user_name: string;
  user_id: string;
  email: string;
  phone?: string;
}): Promise<{ success: boolean; access_token?: string; error?: string }> => {
  try {
    const chatwootPassword = generateChatwootPassword(userData.email, userData.phone);
    
    const payload = {
      user_name: userData.user_name,
      user_id: userData.user_id,
      email: userData.email,
      chatwoot_password: chatwootPassword,
      action: 'create_chatwoot_account'
    };

    console.log('Criando conta Chatwoot:', payload);

    const response = await fetch(`${import.meta.env.VITE_NWH_BASE_URL}/webhook/${import.meta.env.VITE_QR_CODE_WEBHOOK_ID}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Erro na criação da conta Chatwoot: ${response.status}`);
    }

    const result = await response.text();
    
    // Tentar fazer parse como JSON
    try {
      const jsonResult = JSON.parse(result);
      return {
        success: true,
        access_token: jsonResult.access_token || jsonResult.chatwoot_access_token
      };
    } catch {
      // Se não for JSON, assumir que é o access_token diretamente
      return {
        success: true,
        access_token: result
      };
    }
  } catch (error) {
    console.error('Erro ao criar conta Chatwoot:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    };
  }
};
