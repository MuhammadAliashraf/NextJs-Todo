'use client';
import React from 'react';

const ToDoForm = () => {
  return (
    <div className="login">
      <section>
        <form action="">
          <input placeholder="Enter Task" type="text" />
          <input placeholder="Enter Task Details" type="text" />
          <button type="submit">Add</button>
        </form>
      </section>
    </div>
  );
};

export default ToDoForm;
