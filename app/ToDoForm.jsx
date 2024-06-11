'use client';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { redirect, useRouter } from 'next/navigation';
import { Context } from '@/components/Clients';
const ToDoForm = () => {
  const { user, task1 } = useContext(Context);
  const router = useRouter();
  const [task, setTask] = useState({
    title: '',
    description: '',
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleTaskAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/newtask', task);
      toast.success(response.data.message);
      router.refresh();
      setTask({
        title: '',
        description: '',
      });
    } catch (error) {
      console.error('Error', error);
      toast.error(error?.response?.data?.message);
    }
  };

  if (!user?._id) return redirect('/login');

  return (
    <div className="login">
      <section>
        <form onSubmit={handleTaskAdd}>
          <input
            name="title"
            value={task?.title}
            onChange={handleChange}
            placeholder="Enter Task"
            type="text"
          />
          <input
            name="description"
            value={task?.description}
            onChange={handleChange}
            placeholder="Enter Task Details"
            type="text"
          />
          <button type="submit">Add</button>
        </form>
      </section>
    </div>
  );
};

export default ToDoForm;
