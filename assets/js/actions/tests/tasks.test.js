import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import expect from 'expect';
import * as actions from '../tasks';


const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const token = 'Fake Token'


describe('actions', () => {
  it('should create an action to add task', () => {
    const data = {data: {}}
    const expectedAction = {
      type: 'ADD_TASK_SUCCESS',
      data
    }
    expect(actions.addTaskSuccess(data)).toEqual(expectedAction)
  })

  it('should create an action to update task', () => {
    const task = {data: {}}
    const expectedAction = {
      type: 'UPDATE_TASK_SUCCESS',
      task
    }
    expect(actions.updateTaskSuccess(task)).toEqual(expectedAction)
  })

  it('should create an action to delete task', () => {
    const data = {task: '', todo: {id: 'id'}}
    const expectedAction = {
      type: 'DELETE_TASK_SUCCESS',
      task: '', todo_id: 'id'}
    expect(actions.deleteTaskSuccess(data)).toEqual(expectedAction)
  })
})


describe('async actions', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  it('creates ADD_TASK_SUCCESS when fetching add task has been done', () => {
    fetchMock
      .postOnce('/api/tasks/', {body: {task: ''}, headers: {'content-type': 'application/json' }})

    const expectedActions = [
      {type: 'ADD_TASK_SUCCESS', data: {task: ''}}
    ]
    const store = mockStore({ tasks: [] })

    return store.dispatch(actions.addTask(token)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
