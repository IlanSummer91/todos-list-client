
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api/todos/',
})

async function fetchTodos() {
  const response = await api.get("/");
  return response.data;
}

export const getTodos = (mode = 'all') => {
  return async (dispatch) => {
    const allTodos = await fetchTodos();
    let todos;
    let toggleChecker;
    switch(mode) {
      case 'all': 
        todos = allTodos;
        break;
      case 'active':
        todos = await api.get('/active').then(res => res.data);
        break;
      case 'completed':
        todos = await api.get('/completed').then(res => res.data);
        break;
      default: return;
    }
    dispatch(setMode(mode));
    if(allTodos.length === 0) {
      toggleChecker = false;
    } else {
      toggleChecker = allTodos.every(todo => todo.completed);
    }
    const remainingTodos = allTodos.filter(todo => !todo.completed).length;
    const anyCompletedTodo = allTodos.find(todo => todo.completed);
    const todosArrayNotEmpty = allTodos.length !== 0;
    dispatch(setTodos(todos, toggleChecker, remainingTodos, anyCompletedTodo, todosArrayNotEmpty));
  }
}

const setTodos = (todos, toggleChecker, remainingTodos, anyCompletedTodo, todosArrayNotEmpty) => {
  return {
    type: 'SET_TODOS',
    payload: {
      todos,
      toggleChecker,
      remainingTodos,
      anyCompletedTodo,
      todosArrayNotEmpty
    }
  }
}

export const deleteTodo = (id, mode) => {
  return async dispatch => {
    const result = await api.delete(`/${id}`);
    if (result.data.success) {
      dispatch(getTodos(mode));
    }
  }
}

export const addTodo = (todo, mode) => {
  return async dispatch => {
    await api.post("/", todo);
    dispatch(getTodos(mode));
  }
}

export const setMode = mode => {
  return {
    type: 'SET_MODE',
    payload: mode
  }
}

export const editTodo = (todo, mode) => {
  return async dispatch => {
    await api.patch(`/${todo._id}`, { content: todo.content });
    dispatch(getTodos(mode));
  }
}

export const editCompleted = (todo, mode) => {
  return async dispatch => {
    await api.patch(`/${todo._id}`, { completed: !todo.completed });
    dispatch(getTodos(mode));
  }
}

export const toggleAll = mode => {
  return async dispatch => {
    await api.patch(`/toggleAll`);
    dispatch(getTodos(mode));
  }
}

export const deleteAllCompleted = mode => {
  return async dispatch => {
    await api.delete('/completed');
    dispatch(getTodos(mode));
  }
}