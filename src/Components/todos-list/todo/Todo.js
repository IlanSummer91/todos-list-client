import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodo, editCompleted, editTodo } from '../../../store/todosAction';
import './Todo.scss';

export function Todo(props) {
  
  const dispatch = useDispatch()
  const mode = useSelector(({todosReducer}) => todosReducer.mode);
  
  function editTodoHandler() {
    const content = prompt("please edit your todo");
    if (content !== null) {
      props.todo.content = content;
      dispatch(editTodo(props.todo, mode))
    }
  }

  function deleteDoubleClickHandler(e) {
    e.stopPropagation();
  }

  return <div className="todo-component">
    <div className="checkbox-container">
      <input checked={props.todo.completed} onChange={() => dispatch(editCompleted(props.todo, mode))} type="checkbox" className="checkbox"></input>
    </div>
    <div onDoubleClick={() => editTodoHandler()} className="content-and-delete">
      <label className={props.todo.completed ? " line" : ""} >{props.todo.content}</label>
      <button className="btn" onClick={() => dispatch(deleteTodo(props.todo._id, mode))} onDoubleClick={(e) => deleteDoubleClickHandler(e)}><i className="fa fa-close"></i></button>
    </div>
  </div>
}