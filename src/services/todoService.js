import utilService from './utilService';

var gTodos = [];
_createTodos();

async function _createTodos() {
    var todos = utilService.loadFromSession('todos');
    gTodos = (todos) ? todos : [
        { _id: utilService.generateId(), task: 'Wash Dishes', belongTo: ['personal errands'], isPriority: true, isDone: false, lastDay: (new Date().getTime() + 1000 * 60 * 60 * 24) },
        { _id: utilService.generateId(), task: 'Walk The Dogs', belongTo: ['personal errands'], isPriority: false, isDone: false, lastDay: (new Date().getTime() + 1000 * 60 * 60 * 48) },
        { _id: utilService.generateId(), task: 'Learn React', belongTo: ['work projects'], isPriority: true, isDone: true, lastDay: (new Date().getTime() + 1000 * 60 * 60 * 24 * 7) },
        { _id: utilService.generateId(), task: 'Learn Angular', belongTo: ['work projects'], isPriority: false, isDone: false, lastDay: (new Date().getTime()) },
        { _id: utilService.generateId(), task: 'Learn Vue', belongTo: ['work projects'], isPriority: true, isDone: true, lastDay: (new Date().getTime() + 1000 * 60 * 60 * 24) },
        { _id: utilService.generateId(), task: 'Lean Node', belongTo: ['work projects'], isPriority: true, isDone: true, lastDay: (new Date().getTime()) },
        { _id: utilService.generateId(), task: 'Buy Milk', belongTo: ['grocery list'], isPriority: false, isDone: false, lastDay: (new Date().getTime() + 1000 * 60 * 60 * 48) },
        { _id: utilService.generateId(), task: 'Buy dog Treats', belongTo: ['grocery list'], isPriority: true, isDone: true, lastDay: (new Date().getTime() + 1000 * 60 * 60 * 12) },
        { _id: utilService.generateId(), task: 'Prepare for tests', belongTo: ['university'], isPriority: true, isDone: false, lastDay: (new Date().getTime() + 1000 * 60 * 60 * 24 * 3) },
        { _id: utilService.generateId(), task: 'Doing Homework', belongTo: ['university'], isPriority: true, isDone: true, lastDay: (new Date().getTime()) },
    ]
    utilService.saveToSession('todos', gTodos)
}

async function removeTodo(id) {
    var idx = gTodos.findIndex((todo) => {
        console.log(todo._id, id)
        return todo._id === id
    });

    gTodos.splice(idx, 1);
    utilService.saveToSession('todos', gTodos);
    return;
}

async function addTodo(todo) {
    todo._id = utilService.generateId();
    gTodos.push(todo);
    utilService.saveToSession('todos', gTodos);
    return todo;
}

async function query() {
    return gTodos
}

async function getTodoById(id) {
    var todo = gTodos.find((todo) => { return todo._id === id })
    return todo;
}

async function updateTodo(updatedTodo) {
    var idx = gTodos.findIndex((todo) => {
        return updatedTodo._id === todo._id;
    })
    gTodos.splice(idx, 1, updatedTodo);
    utilService.saveToSession('todos', gTodos)
    return updatedTodo;
}

export default {
    query,
    getTodoById,
    removeTodo,
    addTodo,
    updateTodo
}