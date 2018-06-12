const todosState = {
    todos: []
}

const todoReducer = (state= todosState, action) => {
    switch(action.type) {
        case 'POPULATE_INITIAL_STATE':
            return {
                todos: action.data
            };
            break;
        case 'ADD_TODO':
            return {
                todos: state.todos.concat(action.todo)
            };
            break;
        default:
            return state
    }
}

export default todoReducer;
