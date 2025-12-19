'use client';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Context } from '@/components/Clients';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Plus, Save, Loader2 } from 'lucide-react';

const ToDoForm = () => {
  const { user, task, settask } = useContext(Context);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [taskData, settaskData] = useState({
    title: '',
    description: '',
  });

  useEffect(() => {
    if (task && task.title) {
      settaskData({
        title: task.title || '',
        description: task.description || '',
      });
    }
  }, [task]);

  const handleChange = (e) => {
    settaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handletaskDataAdd = async (e) => {
    e.preventDefault();
    if (!taskData.title.trim()) {
      toast.error("Title is required");
      return;
    }
    
    setIsLoading(true);
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
       toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    if (!taskData.title.trim()) {
      toast.error("Title is required");
      return;
    }

    setIsLoading(true);
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
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => {
    settask({});
    settaskData({ title: '', description: '' });
  };

  if (!user?._id) return null; 

  const isEditing = task && task?._id;

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <Card>
        <CardHeader>
          <CardTitle>{isEditing ? 'Edit Task' : 'Add New Task'}</CardTitle>
          <CardDescription>
            {isEditing ? 'Update your task details below.' : 'Create a new task to stay organized.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={isEditing ? handleUpdateTask : handletaskDataAdd} className="space-y-4">
            <div className="space-y-2">
              <Input
                name="title"
                value={taskData?.title}
                onChange={handleChange}
                placeholder="Task Title (e.g., Buy Groceries)"
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Textarea
                name="description"
                value={taskData?.description}
                onChange={handleChange}
                placeholder="Task Details (Optional)"
                disabled={isLoading}
                rows={3}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isEditing ? 'Updating...' : 'Adding...'}
                  </>
                ) : (
                  <>
                    {isEditing ? <Save className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
                    {isEditing ? 'Update Task' : 'Add Task'}
                  </>
                )}
              </Button>
              
              {isEditing && (
                <Button 
                  type="button" 
                  variant="ghost" 
                  onClick={handleCancelEdit}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ToDoForm;
