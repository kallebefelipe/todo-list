import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import expect from 'expect';
import * as actions from '../user';


const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const token = 'Fake Token'


describe('actions', () => {
  it('should create an action to load users', () => {
    const users = {users: []}
    const expectedAction = {
      type: 'LOAD_USERS_SUCCESS',
      users
    }
    expect(actions.getUsersSuccess(users)).toEqual(expectedAction)
  })
})


describe('async actions', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  it('creates LOAD_USERS_SUCCESS when fetching load users has been done', () => {
    fetchMock
      .getOnce('api/user/', {body: {users: []}, headers: {'content-type': 'application/json' }})

    const expectedActions = [
      {type: 'LOAD_USERS_SUCCESS', users: {users: []}}
    ]
    const store = mockStore({ users: [] })

    return store.dispatch(actions.getUsers(token)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})

