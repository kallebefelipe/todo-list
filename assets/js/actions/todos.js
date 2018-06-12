const populateInitialState = (data) => ({
    type: 'POPULATE_INITIAL_STATE',
    data: data
});

const addTodo = (todo) => ({
    type: 'ADD_TODO',
    todo
});

export { populateInitialState, addTodo };
