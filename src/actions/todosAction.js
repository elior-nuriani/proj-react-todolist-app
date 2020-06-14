import todoService from '../services/todoService';

export const loadTodos = () => {
    return async (dispatch) => {
        const todos = await todoService.query();
        return dispatch({ type: 'LOAD_TODOS', todos })
    }
}

export const changeFilter = (filter) => {
    return async (dispatch) => {
        return dispatch({ type: 'CHANGE_FILTER', filter })
    }
}

export const updateTodo = (todo) => {
    return async (dispatch) => {
        const updatedTodo = await todoService.updateTodo(todo);
        return dispatch({ type: 'UPDATE_TODO', updatedTodo })
    }
}

export const removeTodo = (id) => {
    return async (dispatch) => {
        await todoService.removeTodo(id);
        return dispatch({ type: 'REMOVE_TODO', id })
    }
}

export const addTodo = (todo) => {
    return async (dispatch) => {
        const newTodo = await todoService.addTodo(todo);
        return dispatch({ type: 'ADD_TODO', newTodo })
    }
}