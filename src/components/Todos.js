import React, { useState, useEffect } from 'react';
import './Todos.css';
import Todo from './Todo';

const Todos = () => {
  // --- states
  // todos state
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    const initialValue = JSON.parse(savedTodos);
    return initialValue || [];
  });
  // done todos state
  const [doneItems, setDoneItems] = useState(() => {
    const savedCompletedItems = localStorage.getItem('doneItems');
    const initialValue = JSON.parse(savedCompletedItems);
    return initialValue || [];
  });

  // --- effects
  useEffect(() => {
    localStorage.setItem('doneItems', JSON.stringify(doneItems));
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [doneItems, todos]);

  // --- functions
  const handleSubmit = (e) => {
    e.preventDefault();
    let inputValue = e.target.todoInput.value;
    if (!inputValue) return;
    setTodos([...todos, inputValue]);
    e.target.todoInput.value = '';
  };

  const deleteFromStorage = (todo) => {
    //filtered todo to delete
    let deletedItem = todos.filter((item) => item === todo);
    deletedItem = deletedItem[0];
    //fitlered items without todo to delete
    const currentTodosArray = todos.filter((item) => item !== todo);

    setDoneItems([...doneItems, deletedItem]);
    setTodos(currentTodosArray);
  };

  const sentBackToTodoLis = (todo) => {
    let deletedFromDoneList = doneItems.filter((item) => item === todo);
    deletedFromDoneList = deletedFromDoneList[0];
    const currentDoneArray = doneItems.filter((item) => item !== todo);

    setTodos([...todos, deletedFromDoneList]);
    setDoneItems(currentDoneArray);
  };

  const deleteFromListForever = (todo) => {
    const currentDoneArray = doneItems.filter((item) => item !== todo);
    setDoneItems(currentDoneArray);
  };

  return (
    <>
      <div className="todos-wrapper">
        {todos.length === 0 ? (
          <h3>Please insert todo name and click submit!</h3>
        ) : (
          <>
            <h3>
              {todos.length > 1
                ? `You have ${todos.length} items on the list`
                : `You have ${todos.length} item on the list`}{' '}
            </h3>
            <div className="todos">
              {todos.map((todo) => (
                <Todo
                  key={todo}
                  todo={todo}
                  action={deleteFromStorage}
                  symbol="&#128071;&#127996;"
                />
              ))}
            </div>
          </>
        )}

        <form onSubmit={(e) => handleSubmit(e)}>
          <input id="todoInput" type="text" placeholder="Enter Item" />
          <input type="submit" />
        </form>
      </div>

      <div className="done-items">
        {doneItems.map((completedItem) => (
          <div className="completed-todos">
            <button
              className="completed-todos-btn"
              onClick={() => deleteFromListForever(completedItem)}
            >
              &#10060;
            </button>
            <Todo
              key={completedItem}
              todo={completedItem}
              action={sentBackToTodoLis}
              symbol="&#9757;&#127996;"
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Todos;
