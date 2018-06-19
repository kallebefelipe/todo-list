import fetchMock from 'fetch-mock';
import expect from 'expect';
import AuthApi from '../AuthApi';


describe('api test auth', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  const header = {'content-type': 'application/json' }

  it('response a fetch register user has been done', () => {
    fetchMock
      .postOnce('api/auth/register/', {body: {username: '', password: '', email: ''}, headers: header})

    const expectedActions = {username: '', password: '', email: ''}

    return AuthApi.registerUser().then((response) => {
      expect(response).toEqual(expectedActions)
    })
  })

  it('response a fetch login user has been done', () => {
    fetchMock
      .postOnce('api/auth/login/', {body: {username: '', password: ''}, headers: header})

    const expectedActions = {username: '', password: ''}

    return AuthApi.loginUser().then((response) => {
      expect(response).toEqual(expectedActions)
    })
  })

  it('response a fetch forgot password has been done', () => {
    fetchMock
      .postOnce('/rest-auth/password/reset/', {body: {email: ''}, headers: header})

    const expectedActions = {email: ''}

    return AuthApi.forgotPassword().then((response) => {
      expect(response).toEqual(expectedActions)
    })
  })

  it('reponse a fetch logout has been done', () => {
    fetchMock
      .postOnce('rest-auth/logout/', {body: {user: 'id'}, headers: header})

    const expectedActions = {user: 'id'}

    return AuthApi.logoutUser().then((response) => {
      expect(response).toEqual(expectedActions)
    })
  })
})
