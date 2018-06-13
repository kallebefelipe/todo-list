import { browserHistory } from 'react-router';

const tasksState = {
    tasks: []
}

const taskReducer = (state= tasksState, action) => {
    switch(action.type) {
        case 'ADD_TASK':
            return {
                tasks: state.tasks.concat(action.tasks)
            };
        case 'LOAD_TASK':
           return {
                todos: Object.assign([], state, action.todos)
            };
        case 'DELETE_TASK_SUCCESS': {
            const newState = Object.assign([], state);
            var pos;
            action.todo.tasks.filter(function(tasks, index) {
                pos = index;
                return action.todo.tasks.id == action.task.id
            })
            newState.todo.tasks.splice(pos, 1);
            return {
                todo: newState.todo
            };
        }
        default:
            return state
    }
}

export default taskReducer;
