import axios from 'axios';
import { cookies } from 'next/headers';
import { TOdoItems } from '../components/Server.jsx';

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
    console.error('Error', error);
  }
};

const TaskRender = async () => {
  const token = cookies().get('token')?.value;
  const myTasks = await fetchTask(token);
  return (
    <section className="todosContainer">
      {myTasks?.map((value, index) => (
        <TOdoItems
          item={value}
          key={value?._id}
          id={value?._id}
          completed={value?.isCompleted}
          title={value?.title}
          detail={value?.description}
        />
      ))}
    </section>
  );
};

export default TaskRender;
