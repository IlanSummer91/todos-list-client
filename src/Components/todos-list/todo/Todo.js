import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTodo, editCompleted, editTodo } from '../../../store/todosAction';
import './Todo.scss';

export function Todo(props) {
  
  const dispatch = useDispatch()

  function editTodoHandler() {
    const content = prompt("please edit your todo");
    if (content !== null) {
      props.todo.content = content;
      dispatch(editTodo(props.todo))
    }
  }

  return <div className="todo-component">
    <input checked={props.todo.completed} onChange={() => dispatch(editCompleted(props.todo))} type="checkbox" className="checkbox"></input>
    <div onDoubleClick={() => editTodoHandler()} className="content-and-delete">
      <label className={props.todo.completed ? " line" : ""} >{props.todo.content}</label>
      <button onClick={() => dispatch(deleteTodo(props.todo._id))}>Delete</button>
    </div>
  </div>
}