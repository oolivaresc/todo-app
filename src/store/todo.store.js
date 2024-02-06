import {Todo} from '../todos/models/todo.model';

//Filtro que se va a aplicar
export const Filters = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending'
}

//Información global que quiero proporcionar a mi aplicación
const state = {
    todos: [
        new Todo('Piedra del alma'),
        new Todo('Piedra de la realidad'),
        new Todo('Piedra del tiempo'),
        new Todo('Piedra del poder'),
        new Todo('Piedra de la mente')
    ],
    filter: Filters.All,
}

const initStore = () => {
    console.log(state);
    console.log('InitStore');
    loadStore();
}

const loadStore = () => {
    if(!localStorage.getItem('state')) return;
    const {todos = [], filter = Filters.All}  = JSON.parse(localStorage.getItem('state'));
    state.todos = todos;
    state.filter = filter;
}

const saveStateToLocalStorage = () => {
    localStorage.setItem('state', JSON.stringify(state));
}

const getTodos = (filter = Filters.All) => {
    switch(filter){
        case Filters.All:
            return [...state.todos];
        case Filters.Completed:
            //filter regresa un nuevo arreglo, otra forma distina al spread
            //Si donde está en true lo va a regresar
            return state.todos.filter(todo=> todo.done)
        case Filters.Pending:
            return state.todos.filter(todo=> !todo.done)
        default:
            throw new Error(`Option ${filter} is not valid.`)
    }
}

/**
 * 
 * @param {String} description 
 */
const addTodo = (description) => {
    if(!description) throw new Error('Description is required');
    state.todos.push(new Todo(description));
    saveStateToLocalStorage();
}

/**
 * 
 * @param {String} todoId 
 */
const toogleTodo = (todoId) => {
    state.todos = state.todos.map(todo => {
        if(todo.id === todoId){
            todo.done = !todo.done;
        }
        return todo;
    });
    saveStateToLocalStorage();
}

/**
 * 
 * @param {String} todoId 
 */
const deleteTodo = (todoId) => {
    state.todos = state.todos.filter(todo => todo.id !== todoId);
    saveStateToLocalStorage();
}

const deleteCompleted = (todoId) => {
    state.todos = state.todos.filter(todo => !todo.done);
    saveStateToLocalStorage();
}

const setFilter = (newFilter = Filters.All) => {
    state.filter = newFilter;
    saveStateToLocalStorage();
}

const getCurrentFilter = () => {
    return state.filter;
}

export default{
    initStore,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    loadStore,
    setFilter,
    toogleTodo,
    getTodos,
    addTodo,
}