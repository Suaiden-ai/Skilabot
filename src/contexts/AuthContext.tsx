
import React, { createContext, useContext } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useAuthWithCache } from '@/hooks/useAuthWithCache';

interface UserProfile {
  id: string;
  email: string | null;
  name: string | null;
  plan: string | null;
  role: 'user' | 'admin';
  created_at: string | null;
  updated_at: string | null;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  loading: boolean;
  initialized: boolean;
  signUp: (email: string, password: string, name: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  isAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, session, profile, loading, initialized, isAdmin, clearCache } = useAuthWithCache();

  const signUp = async (email: string, password: string, name: string) => {
    try {
      console.log('Tentando registrar usuário:', email);
      
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name
          },
          emailRedirectTo: redirectUrl
        }
      });

      console.log('Resposta do registro:', { data, error });

      if (error) {
        console.error('Erro no registro:', error);
        return { error };
      }

      // Se o usuário foi criado mas não confirmado, ainda retorna sucesso
      if (data.user && !data.user.email_confirmed_at) {
        // Disparar Edge Function para webhooks de user_created
        try {
          await fetch('https://dawqhytdogagnwwhndjt.functions.supabase.co/user_created_webhook', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhd3FoeXRkb2dhZ253d2huZGp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4NjU4NzEsImV4cCI6MjA2NjQ0MTg3MX0.st3PJZJsLff63mOTETQYBWha4Nz4gAzeyIHHkrQrSa8'
            },
            body: JSON.stringify({
              event: 'user_created',
              user: {
                id: data.user.id,
                email: data.user.email,
                // Adicione outros campos relevantes se necessário
                name: name
              }
            })
          });
        } catch (err) {
          // Não bloqueia o fluxo se o webhook falhar
          console.error('Erro ao disparar webhook user_created:', err);
        }
        console.log('Usuário criado, aguardando confirmação por email');
        return { error: null };
      }

      // Se usuário já confirmado
      if (data.user) {
        try {
          await fetch('https://dawqhytdogagnwwhndjt.functions.supabase.co/user_created_webhook', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhd3FoeXRkb2dhZ253d2huZGp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4NjU4NzEsImV4cCI6MjA2NjQ0MTg3MX0.st3PJZJsLff63mOTETQYBWha4Nz4gAzeyIHHkrQrSa8'
            },
            body: JSON.stringify({
              event: 'user_created',
              user: {
                id: data.user.id,
                email: data.user.email,
                name: name
              }
            })
          });
        } catch (err) {
          console.error('Erro ao disparar webhook user_created:', err);
        }
      }

      return { error: null };
    } catch (error) {
      console.error('Erro inesperado no registro:', error);
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Tentando fazer login:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log('Resposta do login:', { data, error });

      if (error) {
        console.error('Erro no login:', error);
        return { error };
      }

      // 1. Buscar perfil do usuário
      if (data.user) {
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("status")
          .eq("id", data.user.id)
          .single();

        if (profileError) {
          return { error: profileError };
        }

        // 2. Bloquear se status for 'inactive' ou 'suspended'
        if (profile.status === "inactive" || profile.status === "suspended") {
          await supabase.auth.signOut();
          return { error: { message: "Your account is inactive or suspended. Please contact support." } };
        }
      }

      // Se login OK, registra log de atividade
      if (data.user) {
        // Função para pegar IP (opcional)
        const getUserIp = async () => {
          try {
            const res = await fetch("https://api.ipify.org?format=json");
            const d = await res.json();
            return d.ip;
          } catch {
            return null;
          }
        };
        const ip = await getUserIp();

        await supabase.from("user_activity_logs").insert([
          {
            user_id: data.user.id,
            activity_type: "login",
            description: "User logged in",
            ip_address: ip,
            user_agent: navigator.userAgent
          }
        ]);
      }

      return { error: null };
    } catch (error) {
      console.error('Erro inesperado no login:', error);
      return { error };
    }
  };

  const signOut = async () => {
    console.log('Fazendo logout...');
    clearCache(); // Limpa o cache antes do logout
    await supabase.auth.signOut();
  };

  const value = {
    user,
    session,
    profile,
    loading,
    initialized,
    signUp,
    signIn,
    signOut,
    isAdmin,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
