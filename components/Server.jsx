import React from 'react';
import { TodoButton } from './Clients';

export const TOdoItems = ({ title, detail, id, completed ,item}) => {
  return (
    <div className="todo">
      <div>
        <h4>{title}</h4>
        <p>{detail}</p>
      </div>
      <div>
        <TodoButton
          id={id}
          completed={completed}
          item={item}
        />
      </div>
    </div>
  );
};
