"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { PhoneInput } from './PhoneInput';
import { useAuth, fetchUserData } from '@/contexts/auth-context';

export function LoginForm() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValid) return;
    
    setIsLoading(true);
    
    try {
      // Fetch random user data
      const userData = await fetchUserData();
      
      // Save to context and localStorage
      login(userData);
      
      // Redirect to dashboard
      router.push('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-6">
      <PhoneInput
        value={phoneNumber}
        onChange={setPhoneNumber}
        onValidityChange={setIsValid}
      />
      
      <Button 
        type="submit" 
        className="w-full"
        disabled={!isValid || isLoading}
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </Button>
    </form>
  );
}