import React, { useContext } from 'react';
import { AppContext } from '../../AppContext';
import './Footer.scss';
import {useSelector} from 'react-redux'

export function Footer() {

  const context = useContext(AppContext);
  const todos = useSelector(state => state.todosReducer.todos);
  const remiainingTodos = todos.filter(todo => !todo.completed).length;

  return <div className="footer">
    <div className="todos-count">{remiainingTodos} items left</div>
    <div>
      <button onClick={() => context.allTodos()}>All</button>
      <button onClick={() => context.onlyActiveTodos()}>Active</button>
      <button onClick={() => context.onlyCompletedTodos()}>Completed</button>
    </div>
    <div></div>
    <div></div>
  </div>
}