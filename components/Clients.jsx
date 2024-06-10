'use client';

import axios from 'axios';
import Link from 'next/link';
import { createContext, useContext, useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export const Context = createContext({ user: {} });
export const ContextProvider = ({ children }) => {
  const [user, setuser] = useState({});

  useEffect(() => {
    axios
      .get('/api/auth/profile')
      .then((res) => setuser(res.data.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <Context.Provider value={{ user, setuser }}>
      {children} <Toaster />{' '}
    </Context.Provider>
  );
};

export const LogoutButton = () => {
  const { user, setuser } = useContext(Context);
  const handleLogout = async () => {
    try {
      await axios.get('/api/auth/logout');
      toast.success('Logout');
      setuser({});
    } catch (error) {
      console.error('Error', error);
    }
  };

  return (
    <>
      {user?._id ? (
        <button onClick={handleLogout} className="btn">
          Logout
        </button>
      ) : (
        <Link href={'/login'}>Login</Link>
      )}
    </>
  );
};

export const TodoButton = ({id, completed} ) => {
  const handleDelete = (id) => {
    alert('This is id:', id);
  };

  return (
    <>
      <input type="checkbox" checked={completed} />
      <button className="btn" onClick={() => handleDelete(id)}>
        Delete
      </button>
      ;
    </>
  );
};
