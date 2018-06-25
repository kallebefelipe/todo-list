import userReducer from '../user'
import * as types from '../../actionTypes';


describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(userReducer(undefined, {})).toEqual(
      {
        users: []
      }
    )
  })

  it('should handle LOAD_USERS_SUCCESS', () => {
    expect(
      userReducer({}, {
        type: types.LOAD_USERS_SUCCESS,
        users: [],
      })
    ).toEqual(
      {
        users: [],
      }
    )
  })
})


