import todosReducer from '../todos'


describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(todosReducer(undefined, {})).toEqual(
      {
        todos: []
      }
    )
  })

  it('should handle POPULATE_INITIAL_STATE', () => {
    expect(
      todosReducer([], {
        type: 'POPULATE_INITIAL_STATE',
        data: [],
      })
    ).toEqual(
      {
        todos: [],
      }
    )
  })

  it('should handle ADD_TODO_SUCCESS', () => {
    expect(
      todosReducer({todos: []}, {
        type: 'ADD_TODO_SUCCESS',
        todo: {},
      })
    ).toEqual(
      {
        todos: [{}],
      }
    )
  })

  it('should handle LOAD_TODO_SUCCESS', () => {
    expect(
      todosReducer({}, {
        type: 'LOAD_TODO_SUCCESS',
        todos: [{}],
      })
    ).toEqual(
      {
        todos: [{}],
      }
    )
  })

  it('should handle DELETE_TODO_SUCCESS', () => {
    expect(
      todosReducer({todos:[{id: 1}]}, {
        type: 'DELETE_TODO_SUCCESS',
        todo: {id: 1},
      })
    ).toEqual(
      {
        todos: [],
      }
    )
  })

  it('should handle UPDATE_TODO_SUCCESS', () => {
    expect(
      todosReducer({todos:[{id: 1, name: 'test'}]}, {
        type: 'UPDATE_TODO_SUCCESS',
        todo: {id: 1, name: 'new_name'},
      })
    ).toEqual(
      {
        todos: [{id: 1, name: 'new_name'}],
      }
    )
  })

  it('should handle ADD_TASK_SUCCESS', () => {
    expect(
      todosReducer({todos:[{id: 1, name: 'test', tasks: []}]}, {
        type: 'ADD_TASK_SUCCESS',
        data: {name: 'new_task', todo:  1}
        },
      )
    ).toEqual(
      {
        todos: [{id: 1, name: 'test', tasks: [{name: 'new_task', todo:  1}]}],
      }
    )
  })

  it('should handle UPDATE_TASK_SUCCESS', () => {
    expect(
      todosReducer({todos:[{id: 1, name: 'test', tasks: [{name: 'name', todo:  1, id: 1}]}]}, {
        type: 'UPDATE_TASK_SUCCESS',
        task: {name: 'new_name', todo:  1, id: 1}
        },
      )
    ).toEqual(
      {
        todos: [{id: 1, name: 'test', tasks: [{name: 'new_name', todo:  1, id: 1}]}],
      }
    )
  })

  it('should handle DELETE_TASK_SUCCESS', () => {
    expect(
      todosReducer({todos:[{id: 1, name: 'test', tasks: [{name: 'name', todo:  1, id: 1}]}]}, {
        type: 'DELETE_TASK_SUCCESS',
        todo_id: 1,
        task: {id: 1}
        },
      )
    ).toEqual(
      {
        todos: [{id: 1, name: 'test', tasks: []}],
      }
    )
  })
})


