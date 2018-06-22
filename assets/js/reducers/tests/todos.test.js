import todosReducer from '../todos'
import * as types from '../../actionTypes';


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
        type: types.POPULATE_INITIAL_STATE,
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
        type: types.ADD_TODO_SUCCESS,
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
        type: types.LOAD_TODO_SUCCESS,
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
        type: types.DELETE_TODO_SUCCESS,
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
        type: types.UPDATE_TODO_SUCCESS,
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
        type: types.ADD_TASK_SUCCESS,
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
        type: types.UPDATE_TASK_SUCCESS,
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
        type: types.DELETE_TASK_SUCCESS,
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
