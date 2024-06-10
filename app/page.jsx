import { Suspense } from 'react';
import ToDoForm from './ToDoForm';
import TaskRender from './taskRender';
export default async function Home() {
  return (
    <>
      <div className="container">
        <ToDoForm />
        <Suspense fallback={<div>Loading....</div>}>
          <TaskRender />
        </Suspense>
      </div>
    </>
  );
}
