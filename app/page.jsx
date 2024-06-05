import Image from 'next/image';
import ToDoForm from './ToDoForm';
import { TOdoItems } from '../components/Server.jsx';
export default function Home() {
  return (
    <>
      <div className="container">
        <ToDoForm />
        <section className="todosContainer">
          <TOdoItems id={2} completed={true} title="This is new item" detail="This is task For PandaPlacement To Complete The Card " />
        </section>
      </div>
    </>
  );
}
