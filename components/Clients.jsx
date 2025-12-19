'use client';

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Trash2, CheckCircle, Circle, Edit } from 'lucide-react';

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
      {children}
      {/* Toaster is now in layout, but keeping here if needed or removed */}
    </Context.Provider>
  );
};

export const LogoutButton = () => {
  const { user, setuser } = useContext(Context);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.get('/api/auth/logout');
      toast.success('Logged out successfully');
      setuser({});
      router.push('/login');
    } catch (error) {
      console.error('Error', error);
      toast.error('Logout failed');
    }
  };

  if (!user?._id) return (
    <Button variant="default" asChild>
      <Link href={'/login'}>Login</Link>
    </Button>
  );

  return (
    <Button variant="destructive" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export const TodoButton = ({ id, completed, item }) => {
  const router = useRouter();
  const { settask } = useContext(Context);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/task/${id}`);
      toast.success('Task Deleted!');
      setShowDeleteModal(false);
      router.refresh();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to delete task');
    }
  };

  const handleUpdateTask = async () => {
    try {
      await axios.put(`/api/task/${id}`);
      toast.success(completed ? 'Task marked as pending' : 'Task completed!');
      router.refresh();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to update task');
    }
  };

  const handleEditTask = (item) => {
    settask(item);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex items-center gap-2">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={handleUpdateTask}
        className={completed ? "text-green-500 hover:text-green-600" : "text-gray-400 hover:text-primary"}
      >
        {completed ? <CheckCircle className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
      </Button>
      
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => handleEditTask(item)}
        className="text-blue-500 hover:text-blue-600 hover:bg-blue-50"
      >
        <Edit className="h-4 w-4" />
      </Button>

      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => setShowDeleteModal(true)}
        className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
      >
        <Trash2 className="h-4 w-4" />
      </Button>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Task"
        description="Are you sure you want to delete this task? This action cannot be undone."
        footer={
          <>
            <Button variant="outline" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </>
        }
      />
    </div>
  );
};
