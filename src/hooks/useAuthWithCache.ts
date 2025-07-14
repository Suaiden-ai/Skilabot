
import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface UserProfile {
  id: string;
  email: string | null;
  name: string | null;
  plan: string | null;
  role: 'user' | 'admin';
  created_at: string | null;
  updated_at: string | null;
}

const CACHE_KEYS = {
  SESSION: 'skilabot_session',
  USER: 'skilabot_user',
  PROFILE: 'skilabot_profile',
  LAST_UPDATE: 'skilabot_last_update'
};

const CACHE_DURATION = 30 * 60 * 1000; // 30 minutos (aumentado para maior persistência)

export const useAuthWithCache = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  // Função para salvar no cache
  const saveToCache = (key: string, data: any) => {
    if (!data) return;
    try {
      localStorage.setItem(key, JSON.stringify({
        data,
        timestamp: Date.now()
      }));
    } catch (error) {
      console.warn('Erro ao salvar no cache:', error);
    }
  };

  // Função para recuperar do cache
  const getFromCache = (key: string) => {
    try {
      const cached = localStorage.getItem(key);
      if (!cached) return null;

      const { data, timestamp } = JSON.parse(cached);
      
      // Verifica se o cache não expirou
      if (Date.now() - timestamp > CACHE_DURATION) {
        localStorage.removeItem(key);
        return null;
      }

      return data;
    } catch (error) {
      console.warn('Erro ao recuperar do cache:', error);
      return null;
    }
  };

  // Função para limpar o cache
  const clearCache = () => {
    Object.values(CACHE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  };

  // Função para validar se a sessão ainda é válida
  const isSessionValid = (session: Session | null): boolean => {
    if (!session || !session.access_token) return false;
    
    try {
      // Verifica se o token ainda não expirou
      const payload = JSON.parse(atob(session.access_token.split('.')[1]));
      const now = Math.floor(Date.now() / 1000);
      return payload.exp > now;
    } catch {
      return false;
    }
  };

  // Função para carregar perfil do usuário
  const loadProfile = async (userId: string) => {
    // Primeiro tenta do cache
    const cachedProfile = getFromCache(CACHE_KEYS.PROFILE);
    if (cachedProfile && cachedProfile.id === userId) {
      setProfile(cachedProfile);
      return cachedProfile;
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Erro ao carregar perfil:', error);
        return null;
      }

      if (data) {
        const profileData = data as UserProfile;
        setProfile(profileData);
        saveToCache(CACHE_KEYS.PROFILE, profileData);
        return profileData;
      }
    } catch (error) {
      console.error('Erro ao carregar perfil:', error);
    }
    return null;
  };

  // Função para atualizar estado de autenticação
  const updateAuthState = async (newSession: Session | null) => {
    console.log('Atualizando estado de autenticação:', newSession?.user?.id);
    
    setSession(newSession);
    setUser(newSession?.user ?? null);

    if (newSession?.user && isSessionValid(newSession)) {
      saveToCache(CACHE_KEYS.SESSION, newSession);
      saveToCache(CACHE_KEYS.USER, newSession.user);
      await loadProfile(newSession.user.id);
    } else {
      setProfile(null);
      clearCache();
    }
  };

  // Inicialização do hook
  useEffect(() => {
    let mounted = true;
    let authSubscription: any;

    const initializeAuth = async () => {
      console.log('Inicializando autenticação...');
      
      // Primeiro, tenta carregar do cache
      const cachedSession = getFromCache(CACHE_KEYS.SESSION);
      const cachedUser = getFromCache(CACHE_KEYS.USER);
      const cachedProfile = getFromCache(CACHE_KEYS.PROFILE);

      if (cachedSession && cachedUser && isSessionValid(cachedSession)) {
        console.log('Carregando dados do cache...');
        setSession(cachedSession);
        setUser(cachedUser);
        if (cachedProfile) {
          setProfile(cachedProfile);
        }
        setLoading(false); // Para de carregar imediatamente quando há cache válido
      }

      try {
        // Configura o listener de mudanças de autenticação
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            console.log('Auth state changed:', event, session?.user?.id);
            
            if (!mounted) return;
            
            // Só atualiza se a sessão realmente mudou
            const currentSession = getFromCache(CACHE_KEYS.SESSION);
            const sessionChanged = !currentSession || 
              currentSession.access_token !== session?.access_token ||
              !isSessionValid(currentSession);

            if (sessionChanged) {
              await updateAuthState(session);
            }
            
            if (!initialized) {
              setLoading(false);
              setInitialized(true);
            }
          }
        );
        
        authSubscription = subscription;

        // Verifica a sessão atual do servidor apenas se não temos cache válido
        if (!cachedSession || !isSessionValid(cachedSession)) {
          const { data: { session }, error } = await supabase.auth.getSession();
          console.log('Verificando sessão do servidor:', session?.user?.id, error);
          
          if (mounted) {
            await updateAuthState(session);
            setLoading(false);
            setInitialized(true);
          }
        } else if (!initialized) {
          setInitialized(true);
        }
      } catch (error) {
        console.error('Erro ao verificar sessão:', error);
        if (mounted) {
          clearCache();
          setLoading(false);
          setInitialized(true);
        }
      }
    };

    initializeAuth();

    // Cleanup function
    return () => {
      mounted = false;
      if (authSubscription) {
        authSubscription.unsubscribe();
      }
    };
  }, []);

  // Handler para visibilidade da página (previne perda de sessão ao trocar abas)
  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (document.hidden || !initialized) return;
      
      console.log('Página voltou ao foco, verificando sessão...');
      
      const cachedSession = getFromCache(CACHE_KEYS.SESSION);
      if (cachedSession && isSessionValid(cachedSession)) {
        // Se temos cache válido, usa ele
        if (!session || session.access_token !== cachedSession.access_token) {
          console.log('Restaurando sessão do cache');
          await updateAuthState(cachedSession);
        }
      } else {
        // Se não temos cache válido, verifica no servidor
        try {
          const { data: { session: serverSession } } = await supabase.auth.getSession();
          if (serverSession && isSessionValid(serverSession)) {
            console.log('Sessão atualizada do servidor');
            await updateAuthState(serverSession);
          } else if (session) {
            console.log('Sessão perdida, limpando estado');
            await updateAuthState(null);
          }
        } catch (error) {
          console.error('Erro ao verificar sessão no foco:', error);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleVisibilityChange);
    };
  }, [initialized, session]);

  const isAdmin = () => {
    return profile?.role === 'admin';
  };

  return {
    user,
    session,
    profile,
    loading,
    initialized,
    isAdmin,
    loadProfile,
    clearCache
  };
};
