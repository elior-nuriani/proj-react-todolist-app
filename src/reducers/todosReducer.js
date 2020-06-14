
const INITIAL_STATE = {
    todos: [],
    filterBy: 'All',
}

export default function todosReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'LOAD_TODOS':
            return {
                ...state,
                todos: action.todos
            }
        case 'CHANGE_FILTER':
            console.log(action.filter)

            return {
                ...state,
                filterBy: action.filter
            }
        case 'UPDATE_TODO':
            let idx = state.todos.findIndex((todo) => {
                return todo._id === action.updatedTodo._id
            })
            return {
                ...state,
                todos: [
                    ...state.todos.slice(0, idx),
                    action.updatedTodo,
                    ...state.todos.slice(idx + 1)
                ]
            }
        case 'REMOVE_TODO':
            let removeIdx = state.todos.findIndex((todo) => {
                return todo._id === action.id
            })
            var removeTodos = (removeIdx === -1)? [...state.todos] : [
                ...state.todos.slice(0, removeIdx),
                ...state.todos.slice(removeIdx + 1)
            ]
            return {
                ...state,
                todos:removeTodos
            }
        case 'ADD_TODO':
            //Check .... !
            var res = state.todos.findIndex((todo) => { return todo._id === action.newTodo._id });
            var todos = (res !== -1) ? [...state.todos] : [...state.todos, action.newTodo];
            return {
                ...state,
                todos
            }

        default:
            return state;
    }
}