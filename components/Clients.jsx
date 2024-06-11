'use client';

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export const Context = createContext({ user: {}, task: {} });

export const ContextProvider = ({ children }) => {
  const [user, setuser] = useState({});
  const [task, settask] = useState({});

  useEffect(() => {
    axios
      .get('/api/auth/profile')
      .then((res) => setuser(res.data.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <Context.Provider value={{ user, setuser, settask, task }}>
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

export const TodoButton = ({ id, completed, item }) => {
  const router = useRouter();
  const { settask } = useContext(Context);
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/task/${id}`);
      toast.success('Task Deleted!');
      router.refresh();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleUpdateTask = async (id) => {
    try {
      await axios.put(`/api/task/${id}`);
      toast.success('Task Updated!');
      router.refresh();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEditTask = async (item) => {
    settask(item);
  };

  return (
    <>
      <input
        type="checkbox"
        onChange={() => handleUpdateTask(id)}
        checked={completed}
      />
      <button className="btn" onClick={() => handleDelete(id)}>
        Delete
      </button>
      <button className="btn" onClick={() => handleEditTask(item)}>
        Edit Task
      </button>
    </>
  );
};
