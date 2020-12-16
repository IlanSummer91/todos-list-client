import React from 'react';
import './Footer.scss';
import {useDispatch, useSelector} from 'react-redux'
import { deleteAllCompleted, getTodos } from '../../store/todosAction';

export function Footer() {

  const dispatch = useDispatch();
  const remainingTodos = useSelector(({todosReducer}) => todosReducer.remainingTodos);
  const mode = useSelector(({todosReducer}) => todosReducer.mode);
  const anyCompletedTodo = useSelector(({todosReducer}) => todosReducer.anyCompletedTodo);
  
  return <div className="footer">
    {remainingTodos !== 1 ? (<div className="todos-count">{remainingTodos} items left</div>) : 
    (<div className="todos-count">{remainingTodos} item left</div>)}
    <div className="filter-buttons-container">
      <button className={mode === 'all' ? 'filter-button' : undefined} onClick={() => dispatch(getTodos())}>All</button>
      <button className={mode === 'active' ? 'filter-button' : undefined} onClick={() => dispatch(getTodos('active'))}>Active</button>
      <button className={mode === 'completed' ? 'filter-button' : undefined} onClick={() => dispatch(getTodos('completed'))}>Completed</button>
    </div>
    <div>
    </div>
    <div className="clear-container">
      <button className={"clear-button" + (anyCompletedTodo ? " shown" : "")} onClick={() => dispatch(deleteAllCompleted(mode))}>Clear completed</button>
    </div>
  </div>
}