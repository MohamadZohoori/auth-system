"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_KEY = 'auth_user_data';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize auth state from localStorage
    const loadUserData = () => {
      if (typeof window !== 'undefined') {
        const data = localStorage.getItem(AUTH_KEY);
        if (data) {
          try {
            const parsedData = JSON.parse(data) as AuthState;
            setAuthState(parsedData);
          } catch (error) {
            console.error('Error parsing auth data:', error);
            // Clear invalid data
            localStorage.removeItem(AUTH_KEY);
          }
        }
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []);

  const login = (userData: User) => {
    const newAuthState = {
      user: userData,
      isAuthenticated: true,
    };
    
    // Update state
    setAuthState(newAuthState);
    
    // Persist to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem(AUTH_KEY, JSON.stringify(newAuthState));
    }
  };

  const logout = () => {
    // Update state
    setAuthState({
      user: null,
      isAuthenticated: false,
    });
    
    // Clear localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem(AUTH_KEY);
    }
  };

  const value = {
    user: authState.user,
    isAuthenticated: authState.isAuthenticated,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// API utility function (separate from context but related to auth)
export async function fetchUserData(): Promise<User> {
  const response = await fetch('https://randomuser.me/api/?results=1&nat=us');
  const data = await response.json();
  return data.results[0];
}