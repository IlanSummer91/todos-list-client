import React, { useState, useEffect } from 'react';
import { Todo } from './todo/Todo';
import './TodosList.scss';

export function TodosList() {

  // const [todos, setTodos] = useState([]);
  const todos = [
    {name: "test", shown: true},
    {name: "test2", shown: false},
    {name: "test3", shown: true},
  ];

  return <div className="todos-list">
    <input placeholder="What needs to be done?" className="add-todo"></input>
    {
      todos.map(todo => <Todo name={todo.name} shown={todo.shown}></Todo>)
    }
  </div>
}