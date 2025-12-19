'use client';

import { Context } from '@/components/Clients';
import axios from 'axios';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { UserPlus, Loader2 } from 'lucide-react';

const Register = () => {
  const { user, setuser } = useContext(Context);
  const [isLoading, setIsLoading] = useState(false);
  
  const [data, setdata] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setdata({
      ...data,
      [name]: value,
    });
  };

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('/api/auth/register', data);
      toast.success(response.data.message);
      setuser(response.data.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };
  if (user?._id) return redirect('/');

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create Account</CardTitle>
          <CardDescription>Join us to start managing your tasks efficiently.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitRegister} className="space-y-4">
            <div className="space-y-2">
              <Input
                name="name"
                value={data.name}
                onChange={handleChange}
                placeholder="Full Name"
                type="text"
                disabled={isLoading}
                required
              />
            </div>
            <div className="space-y-2">
              <Input
                name="email"
                value={data.email}
                onChange={handleChange}
                placeholder="Email Address"
                type="email"
                disabled={isLoading}
                required
              />
            </div>
            <div className="space-y-2">
              <Input
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Password"
                type="password"
                disabled={isLoading}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Register
                </>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
           <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or</span>
            </div>
          </div>
          <Button variant="ghost" className="w-full" asChild>
            <Link href={'/login'}>Already have an account? Login</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
