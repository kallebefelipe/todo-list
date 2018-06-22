import * as types from '../actionTypes';


const authState = {
    users: [],
}


const userReducer = (state= authState, action) => {
  switch(action.type) {
    case types.LOAD_USERS_SUCCESS:
      return {
        users: action.users
      };
    default:
      return state
  }
}


export default userReducer;
