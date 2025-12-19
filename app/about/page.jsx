'use client';
import { Context } from '@/components/Clients';
import { redirect } from 'next/navigation';
import { useContext } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { User, Mail } from 'lucide-react';

const About = () => {
  const { user } = useContext(Context);

  if (!user?._id) return redirect('/login');

  return (
    <div className="container py-8 max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>My Profile</CardTitle>
          <CardDescription>View your account information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4 rounded-md border p-4">
            <User className="h-5 w-5 text-muted-foreground" />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">Name</p>
              <p className="text-sm text-foreground">{user.name}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 rounded-md border p-4">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">Email</p>
              <p className="text-sm text-foreground">{user.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;
