import React from 'react';
import './Footer.scss';
import {useDispatch, useSelector} from 'react-redux'
import { getActiveTodos, getCompletedTodos, getTodos } from '../../store/todosAction';

export function Footer() {

  const dispatch = useDispatch();
  const remainingTodos = useSelector(({todosReducer}) => todosReducer.remainingTodos)

  return <div className="footer">
    <div className="todos-count">{remainingTodos} items left</div>
    <div>
      <button onClick={() => dispatch(getTodos())}>All</button>
      <button onClick={() => dispatch(getActiveTodos())}>Active</button>
      <button onClick={() => dispatch(getCompletedTodos())}>Completed</button>
    </div>
    <div></div>
    <div></div>
  </div>
}