import { Metadata } from 'next';
import { LoginPage } from '@/components/pages/login/LoginPage';

export const metadata: Metadata = {
  title: 'Login | Authentication System',
  description: 'Log in with your Iranian phone number',
  keywords: 'login, authentication, phone number, Iran',
};

export default function Login() {
  return <LoginPage />;
}