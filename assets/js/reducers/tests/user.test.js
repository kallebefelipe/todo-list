import userReducer from '../user'


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
        type: 'LOAD_USERS_SUCCESS',
        users: [],
      })
    ).toEqual(
      {
        users: [],
      }
    )
  })
})


