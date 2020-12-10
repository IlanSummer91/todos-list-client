
import axios from 'axios';

const api = axios.create({
  baseURL: '/api/todos',
})

async function fetchTodos() {
  const response = await api.get("/");
  return response.data;
}

function allCompletedChcker(todos) {
  return todos.every(todo => todo.completed);
}

export const getTodos = () => {
  return async (dispatch) => {
    const result = await fetchTodos();
    const checker = allCompletedChcker(result);
    const remainingTodos = result.filter(todo => !todo.completed).length;
    dispatch(setTodos(result, checker, remainingTodos));
  }
}

const setTodos = (todos, toggleChecker, remainingTodos) => {
  return {
    type: 'SET_TODOS',
    payload: {
      todos,
      toggleChecker,
      remainingTodos
    }
  }
}

export const deleteTodo = id => {
  return async dispatch => {
    const result = await api.delete(`/${id}`);
    if (result.data.success) {
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
    await api.patch(`/${todo._id}`, { content: todo.content });
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
    await api.patch(`/${todo._id}`, { completed: !todo.completed });
    dispatch(editCompletedAction(todo));
    dispatch(getTodos());
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
    const todosCompletedChecker = allCompletedChcker(todos);
    await api.patch(`/toggleAll`, { completed: !todosCompletedChecker });
    dispatch(toggleAllAction(todos));
  }
}

const toggleAllAction = todos => {
  return {
    type: 'TOGGLE_ALL',
    payload: todos
  }
}

export const getActiveTodos = () => {
  return async dispatch => {
    const response = await api.get('/active').then(res => res.data);
    dispatch(setActiveTodosAction(response));
  }
}

const setActiveTodosAction = todos => {
  return {
    type: 'SET_ACTIVE_TODOS',
    payload: todos
  }
}

export const getCompletedTodos = () => {
  return async dispatch => {
    const response = await api.get('/completed').then(res => res.data)
    dispatch(setCompletedTodosAction(response));
  }
}

const setCompletedTodosAction = todos => {
  return {
    type: 'SET_COMPLETED_TODOS',
    payload: todos
  }
}