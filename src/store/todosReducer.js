const initialState = {
  todos: [],
  toggleChecker: false,
  remainingTodos: 0
}

const todosReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_TODOS':
      return {
        ...state,
        todos: action.payload.todos,
        toggleChecker: action.payload.toggleChecker,
        remainingTodos: action.payload.remainingTodos
      }
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo._id !== action.payload),
        remainingTodos: state.remainingTodos - 1
      }
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload],
        remainingTodos: state.remainingTodos + 1
      }
    case 'EDIT_TODO':
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo._id === action.payload._id) {
            return { ...todo, content: action.payload }
          }
          return todo;
        })
      }
    case 'EDIT_COMPLETED':
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo._id === action.payload._id) {
            return { ...todo, completed: !action.payload.completed }
          }
          return todo;
        })
      }
    case 'CHANGE_TOGGLE':
      return {
        ...state,
        toggleChecker: action.payload
      }
    case 'SET_ACTIVE_TODOS':
      return {
        ...state,
        todos: action.payload
      }
    case 'SET_COMPLETED_TODOS':
      return {
        ...state,
        todos: action.payload
      }
    default:
      return state;
  }
}

export default todosReducer;