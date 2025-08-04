
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useAuthWithCache } from "@/hooks/useAuthWithCache";

interface Profile {
  id: string;
  email: string | null;
  name: string | null;
  plan: string | null;  // Pode ser null
  role: 'user' | 'admin';
  created_at: string | null;
  updated_at: string | null;
  accepted_terms_at?: string | null;
  status?: string | null;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, name: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  loadProfile: (userId: string) => Promise<void>;
  isAdmin: boolean;
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
  // Remover isAdmin do destructuring para evitar conflito
  const { user, session, profile, loading, initialized, clearCache, setProfile } = useAuthWithCache();

  // Debug logs
  useEffect(() => {
    console.log('AuthContext - User:', user);
    console.log('AuthContext - Profile:', profile);
    console.log('AuthContext - Loading:', loading);
    console.log('AuthContext - Initialized:', initialized);
  }, [user, profile, loading, initialized]);

  // Sincroniza sessão entre abas: recarrega se a sessão do Supabase mudar
  useEffect(() => {
    const handler = (event: StorageEvent) => {
      if (event.key && event.key.includes('supabase.auth.token')) {
        window.location.reload();
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const loadProfile = async (userId: string) => {
    try {
      console.log('AuthContext - Loading profile for user:', userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error loading profile:', error);
        return;
      }

      console.log('AuthContext - Profile loaded:', data);
      setProfile(data);
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signUp = async (email: string, password: string, name: string) => {
    // NÃO definir plano aqui - deixar NULL até pagamento
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: {
          name: name,
          // NÃO incluir plano nos metadados
        }
      }
    });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    clearCache();
  };

  const isAdmin = profile?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        loading,
        signIn,
        signUp,
        signOut,
        loadProfile,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
