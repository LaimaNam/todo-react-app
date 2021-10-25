import React from 'react';
import './Todo.css';

const Todo = ({ todo, action, symbol }) => {
  return (
    <div className="todo-item-wrapper">
      <p className="todo-item">{todo}</p>
      <button className="todo-delete-btn" onClick={() => action(todo)}>
        {symbol}
      </button>
    </div>
  );
};

export default Todo;
