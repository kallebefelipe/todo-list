import * as types from '../../actionTypes';
import authReducer from '../auth'


describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(authReducer(undefined, {})).toEqual(
      {
        username: '',
        email: '',
        token: localStorage.getItem("token"),
        user: undefined,
        isAuthenticated: false,
        registerFail: false
      }
    )
  })

  it('should handle LOGIN_USER_SUCCESS', () => {
    expect(
      authReducer({}, {
        type: types.LOGIN_USER_SUCCESS,
        data: {
          user: {
          username: 'user',
          id: 1
          }
        },
      })
    ).toEqual(
      {
       email: undefined,
       isAuthenticated: true,
       status: undefined,
       token: undefined,
       user: 1,
       username: 'user',
       registerFail: undefined
      }
    )
  })

  it('should handle REGISTER_USER_SUCCESS', () => {
    expect(
      authReducer({}, {
        type: types.REGISTER_USER_SUCCESS,
        data: {
          user: {
            email: 'email',
            username: 'username'
            },
          },
        }
      )
    ).toEqual(
      {
        email: 'email',
        isAuthenticated: true,
        status: undefined,
        token: undefined,
        user: undefined,
        username: 'username',
        registerFail: undefined
      }
    )
  })

  it('should handle FORGOT_PASSWORD_SUCCESS', () => {
    expect(
      authReducer({}, {
        type: types.FORGOT_PASSWORD_SUCCESS,
        data: {
          user: {
            email: 'email@email.com',
            username: 'username'
            },
        },
      })
    ).toEqual(
      {
        email: 'email@email.com',
        isAuthenticated: false,
        status: undefined,
        token: undefined,
        user: undefined,
        username: 'username',
        registerFail: undefined
      }
    )
  })

  it('should handle LOGOUT_SUCCESS', () => {
    expect(
      authReducer({}, {
        type: types.LOGOUT_SUCCESS
        },
      )
    ).toEqual(
      {
        username: '',
        email: '',
        token: '',
        user: '',
        isAuthenticated: false,
        status: undefined,
        registerFail: false
      }
    )
  })
})


