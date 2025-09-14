"use client"

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth-context';

export function WelcomeCard() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (!user) {
    return null;
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-col items-center space-y-4">
        <div className="relative w-24 h-24 overflow-hidden rounded-full">
          <Image
            src={user.picture.large}
            alt={`${user.name.first} ${user.name.last}`}
            fill
            className="object-cover"
          />
        </div>
        <CardTitle className="md:text-xl font-bold text-center">
          Welcome, {user.name.first} {user.name.last}!
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center space-y-2">
          <p className="text-sm text-gray-500">You&apos;ve successfully logged in.</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="destructive" 
          className="w-full" 
          onClick={handleLogout}
        >
          Logout
        </Button>
      </CardFooter>
    </Card>
  );
}