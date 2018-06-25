import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import expect from 'expect';
import * as actions from '../todos';
import * as types from '../../actionTypes';


const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const token = 'Fake Token'


describe('actions', () => {
  it('should create an action to delete todo', () => {
    const todo = {id: 'id'}
    const expectedAction = {
      type: types.DELETE_TODO_SUCCESS,
      todo
    }
    expect(actions.deleteTodoSuccess(todo)).toEqual(expectedAction)
  })

  it('should create an action to add todo', () => {
    const todo = {data: {}}
    const expectedAction = {
      type: types.ADD_TODO_SUCCESS,
      todo
    }
    expect(actions.addTodoSuccess(todo)).toEqual(expectedAction)
  })

  it('should create an action to load todos', () => {
    const data = {todos: []}
    const expectedAction = {
      type: types.LOAD_TODO_SUCCESS,
      todos: {'todos': []}}
    expect(actions.loadTodoSuccess(data)).toEqual(expectedAction)
  })

  it('should create an action to update todos', () => {
    const data = {todo: 'id'}
    const expectedAction = {
      type: types.UPDATE_TODO_SUCCESS,
      todo: {todo: "id"}}
    expect(actions.updateTodoSuccess(data)).toEqual(expectedAction)
  })
})


describe('async actions', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })
  const header = {'content-type': 'application/json' }

  it('creates ADD_TODO_SUCCESS when fetching add todo has been done', () => {
    fetchMock
      .postOnce('/api/todos/', {body: {todo: ''}, headers: header})

    const expectedActions = [
      {type: 'ADD_TODO_SUCCESS', todo: {todo: ''}}
    ]
    const store = mockStore({ todos: [] })

    return store.dispatch(actions.addTodo(token)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('creates LOAD_TODO_SUCCESS when fetching load todos has been done', () => {
    fetchMock
      .getOnce('/api/todos/', {body: {todos: []}, headers: header})

    const expectedActions = [
      {type: 'LOAD_TODO_SUCCESS', todos:{todos: []}}
    ]
    const store = mockStore({ todos: [] })

    return store.dispatch(actions.loadTodos(token)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
