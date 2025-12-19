'use client';

import axios from 'axios';
import Link from 'next/link';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { Context } from '../../components/Clients';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { LogIn, Loader2 } from 'lucide-react';

const Login = () => {
  const [data, setdata] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const { user, setuser } = useContext(Context);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setdata({
      ...data,
      [name]: value,
    });
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('/api/auth/login', data);
      toast.success(response.data.message);
      setuser(response.data.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  if (user?._id) return redirect('/');

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome Back</CardTitle>
          <CardDescription>Enter your credentials to access your tasks.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitLogin} className="space-y-4">
            <div className="space-y-2">
              <Input
                onChange={handleChange}
                name="email"
                value={data.email}
                placeholder="Email Address"
                type="email"
                disabled={isLoading}
                required
              />
            </div>
            <div className="space-y-2">
              <Input
                onChange={handleChange}
                name="password"
                value={data.password}
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
                  Logging in...
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
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
          <Button variant="outline" className="w-full" asChild>
            <Link href={'/register'}>Create New Account</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
