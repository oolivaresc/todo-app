import {Todo} from '../models/todo.model';
import {createTodoHTML} from './';

let element;

/**
 * 
 * @param {String} elementId 
 * @param {Todo} todos 
 */
export const renderTodos = (elementId, todos = []) =>{
    if(!element){
        element = document.querySelector(elementId);
    }if(!element){
        throw new Error(`Element ${elementId} not found`);
    }

    element.innerHTML = '';

    //TODO referencia
    const elemnt = document.querySelector(elementId);

    todos.forEach(todo => {
        elemnt.append(createTodoHTML(todo));
    });
}