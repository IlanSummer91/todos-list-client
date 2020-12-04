import React, { useState, useEffect, useRef } from 'react';
import { Todo } from './todo/Todo';
import './TodosList.scss';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, getTodos, toggleAll } from '../../store/todosAction';

export function TodosList() {
  const todoRef = useRef("");
  const todos = useSelector(state => state.todosReducer.todos);
  const dispatch = useDispatch();
  const toggleChecker = useSelector(({todosReducer}) => todosReducer.toggleChecker);
  
  const api = axios.create({
    baseURL: 'http://localhost:3001/api/todos',
  })

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  function addTodoHandler(e) {
    e.preventDefault();
    dispatch(addTodo({ content: todoRef.current.value, completed: false }));
    todoRef.current.value = "";
  }

  return <div className="todos-list">
      <form className="add-todo-container" onSubmit={(e) => addTodoHandler(e)}>
        <div className="toggle-todos" onClick={() => dispatch(toggleAll(todos))}>
          <div className={"triangle-down " + (!toggleChecker ? "transparent" : "" )}></div>
        </div>
        <input ref={todoRef} placeholder="What needs to be done?" className="add-todo"></input>
      </form>
      {
        todos.map(todo => <Todo todo={todo} key={todo._id}></Todo>)
      }
    </div>
}