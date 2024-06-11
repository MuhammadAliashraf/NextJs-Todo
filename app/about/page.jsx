'use client';
import { Context } from '@/components/Clients';
import { redirect } from 'next/navigation';
import { useContext } from 'react';

const About = () => {
  const { user } = useContext(Context);

  if (!user?._id) return redirect('/login');

  return (
    <div>
      <div>
        {user && (
          <div>
            <h1>{user.name}</h1>
            <h1>{user.email}</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default About;
