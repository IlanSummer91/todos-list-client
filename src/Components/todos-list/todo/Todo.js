import React from 'react';
import './Todo.scss';

function deleteUser() {

}

export function Todo(props) {
  return <div className={(props.shown ? "" : "hidden ") + "todo-component"}>
    <div className="left-wrapper">
      <input type="checkbox" className="checkbox"></input>
      <label>{props.name}</label>
    </div>
    <div>
      <button>Edit</button>
      <button onClick={() => deleteUser()}>Delete</button>
    </div>
  </div>
}