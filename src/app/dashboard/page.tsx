import { Metadata } from 'next';
import { DashboardPage } from '@/components/pages/dashboard/DashboardPage';

export const metadata: Metadata = {
  title: 'Dashboard | Authentication System',
  description: 'User dashboard for authenticated users',
  keywords: 'dashboard, user profile, authenticated',
};

export default function Dashboard() {
  return <DashboardPage />;
}