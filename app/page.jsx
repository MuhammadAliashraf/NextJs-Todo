import { Suspense } from 'react';
import ToDoForm from './ToDoForm';
import TaskRender from './taskRender';

export default async function Home() {
  return (
    <div className="container py-8 space-y-8">
      <ToDoForm />
      <Suspense fallback={<div className="text-center py-10">Loading tasks...</div>}>
        <TaskRender />
      </Suspense>
    </div>
  );
}
