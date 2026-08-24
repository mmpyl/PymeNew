'use client';

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { apiFetch, AuthResponse, AuthUser } from '@/lib/api';

type Credentials = { email: string; password: string };
type RegisterPayload = Credentials & { datosAdicionales?: Record<string, unknown> };

type AuthContextValue = {
  token: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  login: (credentials: Credentials) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const STORAGE_KEY = 'pymen.auth';

function readStoredSession(): AuthResponse | null {
  const stored = window.localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return null;
  }

  try {
    const session = JSON.parse(stored) as Partial<AuthResponse>;

    if (!session.accessToken || !session.user?.email) {
      window.localStorage.removeItem(STORAGE_KEY);
      return null;
    }

    return session as AuthResponse;
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const session = readStoredSession();

    if (session) {
      setToken(session.accessToken);
      setUser(session.user);
    }

    setIsAuthLoading(false);
  }, []);

  const persistSession = (session: AuthResponse) => {
    setToken(session.accessToken);
    setUser(session.user);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  };

  const value = useMemo<AuthContextValue>(() => ({
    token,
    user,
    isAuthenticated: Boolean(token),
    isAuthLoading,
    login: async (credentials) => {
      const session = await apiFetch<AuthResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
      persistSession(session);
    },
    register: async (payload) => {
      const session = await apiFetch<AuthResponse>('/auth/register', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      persistSession(session);
    },
    logout: () => {
      setToken(null);
      setUser(null);
      window.localStorage.removeItem(STORAGE_KEY);
    },
  }), [isAuthLoading, token, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}
