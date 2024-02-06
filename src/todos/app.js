import html from './app.html?raw';
import todoStore, {Filters} from '../store/todo.store';
import {renderTodos, renderPending} from './use-cases';

const EllementIDs = {
    ClearCompletedButton: '.clear-completed',
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    TodoFilters: '.filtro',
    PendingCountLabel: '#pending-count',
}

/**
 * @param {String} elementId
 */
export const App = (elementId) => {
 
    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(EllementIDs.TodoList, todos);
        updatePendingCount();
    }

    const updatePendingCount = () => {
        renderPending(EllementIDs.PendingCountLabel);
    }

    //Cuando la función App() se llama
    (()=>{
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();

    //Referencias HTML
    const newDescriptionInput = document.querySelector(EllementIDs.NewTodoInput);
    const todoListUL = document.querySelector(EllementIDs.TodoList);
    const clearCompletedButton = document.querySelector(EllementIDs.ClearCompletedButton);
    const filtersUL = document.querySelectorAll(EllementIDs.TodoFilters);

    //Listeners
    newDescriptionInput.addEventListener('keyup', (event) => {
        //console.log(event.target.value);
        //Si es diferente a Enter, lo va a sacar, si es Enter se procesa el texto
        if(event.keyCode !== 13 ) return;
        if(event.target.value.trim().length === 0) return;

        todoStore.addTodo(event.target.value);
        displayTodos();
        event.target.value = '';
    });

    todoListUL.addEventListener('click', (event) => {
        //closest busca el elemento padre
        const element = event.target.closest('[data-id]');
        todoStore.toogleTodo(element.getAttribute('data-id'));
        displayTodos();
    });

    todoListUL.addEventListener('click', (event) => {
        const isDestroyElement = event.target.className === 'destroy';
        const element = event.target.closest('[data-id]');
        if(!element || !isDestroyElement) return;
        todoStore.deleteTodo(element.getAttribute('data-id'));
        displayTodos();
    });

    clearCompletedButton.addEventListener('click', (event) => {
        todoStore.deleteCompleted();
        displayTodos();
    });

    filtersUL.forEach(element=>{
        element.addEventListener('click', (element) =>{
            filtersUL.forEach(el=>el.classList.remove('selected'));
            element.target.classList.add('selected');
            switch(element.target.text){
                case 'Todos':
                    todoStore.setFilter(Filters.All);
                break;
                case 'Pendientes':
                    todoStore.setFilter(Filters.Pending);
                break;
                case 'Completados':
                    todoStore.setFilter(Filters.Completed);
                break;
            }

            displayTodos();
        });
    });
}