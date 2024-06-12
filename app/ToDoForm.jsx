'use client';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { redirect, useRouter } from 'next/navigation';
import { Context } from '@/components/Clients';
const ToDoForm = () => {
  const { user, task, settask } = useContext(Context);
  const router = useRouter();
  const [taskData, settaskData] = useState({
    title: '',
    description: '',
  });
  useEffect(() => {
    if (task) {
      setTaskData({
        title: task.title,
        description: task.description,
      });
    }
  }, [task]);

  const handleChange = (e) => {
    settaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handletaskDataAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/newtask', taskData);
      toast.success(response.data.message);
      router.refresh();
      settaskData({
        title: '',
        description: '',
      });
    } catch (error) {
      console.error('Error', error);
      toast.error(error?.response?.data?.message);
    }
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/task/edit/${task?._id}`, taskData);
      toast.success(response.data.message);
      router.refresh();
      settaskData({
        title: '',
        description: '',
      });
      settask({});
    } catch (error) {
      console.error('Error', error);
      toast.error(error?.response?.data?.message);
    }
  };

  if (!user?._id) return redirect('/login');



  return (
    <div className="login">
      <section>
        <form
          onSubmit={task && task?._id ? handleUpdateTask : handletaskDataAdd}
        >
          <input
            name="title"
            value={taskData?.title}
            onChange={handleChange}
            placeholder="Enter taskData"
            type="text"
          />
          <input
            name="description"
            value={taskData?.description}
            onChange={handleChange}
            placeholder="Enter taskData Details"
            type="text"
          />
          <button type="submit">
            {task && task?._id ? 'Update Task' : 'Add'}
          </button>
        </form>
      </section>
    </div>
  );
};

export default ToDoForm;
