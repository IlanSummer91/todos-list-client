
import axios from 'axios';

  const api = axios.create({
    baseURL: 'http://localhost:3001/api/todos',
  })

export const getTodos = () => {
  return async (dispatch) => {
    const result = await fetchTodos();   
      dispatch(setTodos(result));
  }
}

const setTodos = todos => {
  return {
    type: 'SET_TODOS',
    payload: todos
  }
}

async function fetchTodos() {
  const response = await api.get("/");
  return response.data;
}

export const deleteTodo = id => {
  return async dispatch => {
    const result = await api.delete(`/${id}`);
    if(result.data.success){ 
      dispatch(deleteTodoAction(id));
    }
  }
}

const deleteTodoAction = id => {
  return {
    type: 'DELETE_TODO',
    payload: id
  }
}

export const addTodo = todo => {
  return async dispatch => {
    const updatedTodo = await api.post("/", todo);
    dispatch(addTodoAction(updatedTodo.data));
  }
}

const addTodoAction = todo => {
  return {
    type: 'ADD_TODO',
    payload: todo
  }
}

export const editTodo = todo => {
  return async dispatch => {
      await api.put(`/${todo._id}`, { content: todo.content });
      dispatch(editTodoAction(todo));
  }
}
const editTodoAction = todo => {
  return {
    type: 'EDIT_TODO',
    payload: todo.content
  }
}

export const editCompleted = todo => {
  return async dispatch => {
    await api.put(`/${todo._id}`, { completed: todo.completed ? false : true });
    dispatch(editCompletedAction(todo));
  }
}

const editCompletedAction = todo => {
  return {
    type: 'EDIT_COMPLETED',
    payload: todo
  }
}

export const toggleAll = todos => {
  return async dispatch => {
    const todosCompletedChecker = todos.every(todo => todo.completed); // all completed
    const promiseArr = todos.map(async todo => {
      await api.put(`/${todo._id}`,{completed: !todosCompletedChecker});
      todo.completed = !todosCompletedChecker;
    });
    Promise.all(promiseArr).then(async () => await dispatch(getTodos())).then(() => dispatch(toggleAllAction(!todosCompletedChecker)));
  }
}

const toggleAllAction = (todosCompletedChecker) => {
  return {
    type: 'TOGGLE_ALL',
    payload: todosCompletedChecker
  }
}