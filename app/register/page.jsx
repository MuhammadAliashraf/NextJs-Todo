'use client';

import { Context } from '@/components/Clients';
import axios from 'axios';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';

const Register = () => {
  const { user, setuser } = useContext(Context);
  
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
    try {
      const response = await axios.post('/api/auth/register', data);
      toast.success(response.data.message);
      setuser(response.data.data);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  if (user?._id) return redirect('/');

  return (
    <div className="login">
      <section>
        <form onSubmit={handleSubmitRegister}>
          <input
            name="name"
            value={data.name}
            onChange={handleChange}
            placeholder="Enter Name"
            type="text"
          />
          <input
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder="Enter Email"
            type="email"
          />
          <input
            name="password"
            value={data.password}
            onChange={handleChange}
            placeholder="Enter Password"
            type="password"
          />
          <button type="submit">Register</button>
          <p>OR</p>
          <Link href={'/login'}>Already have an account? Login</Link>
        </form>
      </section>
    </div>
  );
};

export default Register;
