import { browserHistory } from 'react-router';

const todosState = {
    todos: []
}

const todoReducer = (state= todosState, action) => {
    switch(action.type) {
        case 'POPULATE_INITIAL_STATE':
            return {
                todos: action.data
            };
        case 'ADD_TODO':
            return {
                todos: state.todos.concat(action.todo)
            };
        case 'LOAD_TODO':
           return {
                todos: Object.assign([], state, action.todos)
            };
        case 'DELETE_TODO_SUCCESS': {
            const newState = Object.assign([], state);
            var pos;
            state.todos.filter(function(todos, index) { pos = index; return todos.id == action.todo.id})
            newState.todos.splice(pos, 1);
            return {
                todos: newState.todos
            };
        }
        default:
            return state
    }
}

export default todoReducer;
