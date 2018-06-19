import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import expect from 'expect';
import * as actions from '../auth';


const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)


describe('actions', () => {
  it('should create an action to login user', () => {
    const data = {user: {}}
    const expectedAction = {
      type: 'LOGIN_USER_SUCCESS',
      data
    }
    expect(actions.userLoginSuccess(data)).toEqual(expectedAction)
  })

  it('should create an action to register user', () => {
    const data = {user: {}}
    const expectedAction = {
      type: 'REGISTER_USER_SUCCESS',
      data
    }
    expect(actions.userRegisterSuccess(data)).toEqual(expectedAction)
  })

  it('should create an action to forgot password', () => {
    const response = {response: {}}
    const expectedAction = {
      type: 'FORGOT_PASSWORD_SUCCESS',
      response
    }
    expect(actions.forgotPasswordSuccess(response)).toEqual(expectedAction)
  })

  it('should create an action to logout success', () => {
    const response = {response: {}}
    const expectedAction = {
      type: 'LOGOUT_SUCCESS',
      response
    }
    expect(actions.logoutSuccess(response)).toEqual(expectedAction)
  })
})


describe('async actions', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  const header = {'content-type': 'application/json' }

  it('creates REGISTER_USER_SUCCESS when fetching register user has been done', () => {
    fetchMock
      .postOnce('api/auth/register/', {body: {username: '', password: '', email: ''}, headers: header})

    const expectedActions = [
      {type: 'REGISTER_USER_SUCCESS', data: {username: '', password: '', email: ''}}
    ]
    const store = mockStore({ user: [] })

    return store.dispatch(actions.registerUser()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('creates LOGIN_USER_SUCCESS when fetching login user has been done', () => {
    fetchMock
      .postOnce('api/auth/login/', {body: {username: '', password: ''}, headers: header})

    const expectedActions = [
      {type: 'LOGIN_USER_SUCCESS', data: {username: '', password: ''}}
    ]
    const store = mockStore({ user: [] })

    return store.dispatch(actions.loginUser()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('creates FORGOT_PASSWORD_SUCCESS when fetching forgot password has been done', () => {
    fetchMock
      .postOnce('/rest-auth/password/reset/', {body: {email: ''}, headers: header})

    const expectedActions = [
      {type: 'FORGOT_PASSWORD_SUCCESS', response: {email: ''}}
    ]
    const store = mockStore({ user: [] })

    return store.dispatch(actions.forgotPassword()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('creates LOGOUT_SUCCESS when fetching logout has been done', () => {
    fetchMock
      .postOnce('rest-auth/logout/', {body: {user: 'id'}, headers: header})

    const expectedActions = [
      {type: 'LOGOUT_SUCCESS', response: {user: 'id'}}
    ]
    const store = mockStore({ user: [] })

    return store.dispatch(actions.logoutUser()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
