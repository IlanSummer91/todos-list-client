const initialState = {
  todos: [],
  toggleChecker: false 
}

const todosReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_TODOS': 
      return {
        ...state,
        todos: action.payload
      }
    case 'DELETE_TODO': 
      return {
        ...state,
        todos: state.todos.filter(todo => todo._id !== action.payload) 
      }
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload]
      }
    case 'EDIT_TODO':
      return {
        ...state,
        todos: state.todos.map(todo => {
            if(todo._id === action.payload._id) {
              return {...todo, content: action.payload}
            }
            return todo;
          })
      }
      case 'EDIT_COMPLETED':
        return {
          ...state,
          todos: state.todos.map(todo => {
              if(todo._id === action.payload._id) {
                return {...todo, completed: !action.payload.completed}
              }
              return todo;
            })
        }
      case 'TOGGLE_ALL':
          return {
            ...state,
            toggleChecker: action.payload
          }
    default:
      return state;
  }
}

export default todosReducer;