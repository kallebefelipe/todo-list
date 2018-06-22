import userApi from '../api/UserApi';
import * as types from '../actionTypes';


export function getUsersSuccess(data) {
  return {type: types.LOAD_USERS_SUCCESS, users: data};
}


const getUsers = function (token) {
  return function(dispatch) {
    return userApi.getAllUser(token).then((users) => {
      dispatch(getUsersSuccess(users));
    })
  }
};


export { getUsers };
