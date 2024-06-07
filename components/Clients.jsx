'use client';

import Link from 'next/link';
import { useState, createContext, useContext } from 'react';
import { Toaster } from 'react-hot-toast';

export const Context = createContext({ user: {} });
export const ContextProvider = ({ children }) => {
  const [user, setuser] = useState({});
  return (
    <Context.Provider value={{ user, setuser }}>
      {children} <Toaster />{' '}
    </Context.Provider>
  );
};

export const LogoutButton = () => {
  const { user } = useContext(Context);
  return (
    <>
      {user?.id ? (
        <button className="btn">Logout</button>
      ) : (
        <Link href={'/login'}>Login</Link>
      )}
    </>
  );
};

export const TodoButton = ({ id, completed }) => {
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
