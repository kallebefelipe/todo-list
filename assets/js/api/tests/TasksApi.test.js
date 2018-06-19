import fetchMock from 'fetch-mock';
import expect from 'expect';
import TasksApi from '../TasksApi';


describe('api task test', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  const token = 'Fake Token'
  const header = {'content-type': 'application/json' }

  it('response a fetch add task has been done', () => {
    fetchMock
      .postOnce('/api/tasks/', {body: {task: ''}, headers: header})

    const expectedActions = {task: ''}

    return TasksApi.addTask(token).then((response) => {
      expect(response).toEqual(expectedActions)
    })
  })

  it('response a fetch delete task has been done', () => {
    fetchMock
      .delete('/api/tasks/1/', {body: {task: ''}, headers: header})

    const expectedActions = 200
    const data = {task: {id: 1}}
    return TasksApi.deleteTask(data, token).then((response) => {
      expect(response).toEqual(expectedActions)
    })
  })

  it('response a fetch update task has been done', () => {
    fetchMock
      .put('api/tasks/1/', {body: {task: ''}, headers: {'content-type': 'application/json' }})

    const expectedActions = {task: ''}
    const data = {id: 1}
    return TasksApi.updateTask(data, token).then((response) => {
      expect(response).toEqual(expectedActions)
    })
  })
})
