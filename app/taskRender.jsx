import axios from 'axios';
import { cookies } from 'next/headers';
import TaskList from '@/components/TaskList';

const fetchTask = async (token) => {
  try {
    const response = await axios.get(`${process.env.URL}/api/gettask`, {
      cache: 'no-cache',
      headers: {
        cookie: `token=${token}`,
      },
    });
    if (!response.data.data) return [];
    return response.data.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return [];
  }
};

const TaskRender = async () => {
  const token = cookies().get('token')?.value;
  // If no token, we might return empty array (handled by fetchTask returning [])
  const myTasks = token ? await fetchTask(token) : [];
  
  return (
    <section className="mt-8">
      <h2 className="text-2xl font-bold mb-6 tracking-tight">Your Tasks</h2>
      <TaskList tasks={myTasks} />
    </section>
  );
};

export default TaskRender;
