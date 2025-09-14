import { Metadata } from 'next';
import { HomePage } from '@/components/pages/home/HomePage';

export const metadata: Metadata = {
  title: 'Home | Authentication System',
  description: 'Welcome to our authentication system',
  keywords: 'authentication, login, dashboard, next.js',
};

export default function Home() {
  return <HomePage />;
}