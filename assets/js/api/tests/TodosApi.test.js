import fetchMock from 'fetch-mock';
import expect from 'expect';
import TodosApi from '../TodosApi';


describe('async actions', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  const token = 'Fake Token'
  const header = {'content-type': 'application/json' }

  it('response a fetch add todo has been done', () => {
    fetchMock
      .postOnce('/api/todos/', {body: {todo: ''}, headers: header})

    const expectedActions = {todo: ''}

    return TodosApi.addTodo(token).then((response) => {
      expect(response).toEqual(expectedActions)
    })
  })

  it('response a fetch delete todo has been done', () => {
    fetchMock
      .delete('/api/todos/1/', {body: {task: ''}, headers: header})

    const expectedActions = 200
    const data = {id: 1}
    return TodosApi.deleteTodo(data, token).then((response) => {
      expect(response).toEqual(expectedActions)
    })
  })

  it('response a fetch update todo has been done', () => {
    fetchMock
      .put('api/todos/1/', {body: {task: ''}, headers: header})

    const expectedActions = 200
    const data = {todo: {id: 1}}
    return TodosApi.updateTodo(data, token).then((response) => {
      expect(response).toEqual(expectedActions)
    })
  })

  it('response a fetching load todos has been done', () => {
    fetchMock
      .getOnce('/api/todos/', {body: {todos: []}, headers: header})

    const expectedActions = {todos: []}

    return TodosApi.getAllTodos(token).then((response) => {
      expect(response).toEqual(expectedActions)
    })
  })
})
