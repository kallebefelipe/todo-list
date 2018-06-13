import todoApi from '../api/TodosApi';

export function deleteTodoSuccess(todo) {
    return {type: 'DELETE_TODO_SUCCESS', todo};
}

export function addTodoSuccess(todo) {
    return {type: 'ADD_TODO_SUCCESS', todo};
}

export function loadTodoSuccess(todos) {
    return {type: 'LOAD_TODO_SUCCESS', todos};
}

export function updateTodoSuccess(todo) {
    return {type: 'UPDATE_TODO_SUCCESS', todo};
}

const populateInitialState = (data) => ({
    type: 'POPULATE_INITIAL_STATE',
    data: data
});

const loadTodos = () => {
    return (dispatch) => {
        return todoApi.getAllTodos().then(todos => {
            dispatch(loadTodoSuccess(todos));
        });
    }
};

const deleteTodo = (todo) => {
    return (dispatch) => {
        return todoApi.deleteTodo(todo).then(() => {
            dispatch(deleteTodoSuccess(todo));
        })
    }
};

const addTodo = function (todo) {
    return function(dispatch) {
        return todoApi.addTodo(todo).then((newTodo) => {
            dispatch(addTodoSuccess(newTodo));
        })
    }
};

const updateTodo = (todo) => {
    return (dispatch) => {
        return todoApi.updateTodo(todo).then(() => {
            dispatch(updateTodoSuccess(todo));
        })
    }
};

export { populateInitialState, addTodo, deleteTodo, loadTodos, updateTodo };
