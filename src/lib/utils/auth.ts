import { User, AuthState } from '@/types';

const AUTH_KEY = 'auth_user_data';

/**
 * Save user data to localStorage
 */
export const saveUserData = (userData: User): void => {
  if (typeof window !== 'undefined') {
    const authState: AuthState = {
      user: userData,
      isAuthenticated: true
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(authState));
  }
};

/**
 * Get user data from localStorage
 */
export const getUserData = (): AuthState => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(AUTH_KEY);
    if (data) {
      return JSON.parse(data) as AuthState;
    }
  }
  return { user: null, isAuthenticated: false };
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  return getUserData().isAuthenticated;
};

/**
 * Clear user data from localStorage (logout)
 */
export const logout = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(AUTH_KEY);
  }
};

/**
 * Fetch random user data from API
 */
export const fetchUserData = async (): Promise<User> => {
  const response = await fetch('https://randomuser.me/api/?results=1&nat=us');
  const data = await response.json();
  return data.results[0];
};