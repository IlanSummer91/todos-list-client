import React from 'react';
import { TodosList } from '../todos-list/TodosList';
import './Section.scss';

export function Section() {
  return <div className="section">
    <TodosList></TodosList>
  </div>
}