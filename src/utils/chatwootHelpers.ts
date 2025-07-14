// Função para gerar senha do Chatwoot baseada em email+telefone
export const generateChatwootPassword = (email: string, phone?: string): string => {
  const baseString = `${email}${phone || ''}`;
  const base64String = btoa(baseString);
  let password = base64String.substring(0, 10);

  // Lista de caracteres especiais permitidos
  const specialChars = "!@#$%&*";
  // Verifica se já contém algum caractere especial
  if (!/[!@#$%&*]/.test(password)) {
    // Substitui o último caractere por um especial aleatório
    const randomSpecial = specialChars[Math.floor(Math.random() * specialChars.length)];
    password = password.substring(0, 9) + randomSpecial;
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

    const response = await fetch("https://nwh.suaiden.com/webhook/e79d4614-5d84-4712-8ad7-c6bb2040f4f1", {
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
