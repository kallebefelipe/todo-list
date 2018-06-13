import todoApi from '../api/TodosApi';

export function deleteTodoSuccess(todo) {
    return {type: 'DELETE_TODO_SUCCESS', todo};
}

const populateInitialState = (data) => ({
    type: 'POPULATE_INITIAL_STATE',
    data: data
});

const addTodo = (todo) => ({
    type: 'ADD_TODO',
    todo
});

function loadTodos () {
    return todoApi.getAllTodos();
};

function deleteTodo (todo) {
    return function(dispatch){
        return todoApi.deleteTodo(todo).then(() => {
            console.log(`Deleted ${todo.id}`)
            dispatch(deleteTodoSuccess(todo))
            return;
        })
    }
};

export { populateInitialState, addTodo, deleteTodo, loadTodos };
