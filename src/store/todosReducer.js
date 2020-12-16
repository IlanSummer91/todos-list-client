const initialState = {
  todos: [],
  toggleChecker: false,
  remainingTodos: 0,
  mode: 'all',
  anyCompletedTodo: false,
  todosArrayNotEmpty: false,
}

const todosReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_MODE':
      return {
        ...state,
        mode: action.payload
      }
    case 'SET_TODOS':
      return {
        ...state,
        todos: action.payload.todos,
        toggleChecker: action.payload.toggleChecker,
        remainingTodos: action.payload.remainingTodos,
        anyCompletedTodo: action.payload.anyCompletedTodo,
        todosArrayNotEmpty: action.payload.todosArrayNotEmpty
      }
    default:
      return state;
  }
}

export default todosReducer;