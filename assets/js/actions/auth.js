import authApi from '../api/AuthApi';
import * as types from '../actionTypes';


export function userLoginSuccess(data) {
  return {type: types.LOGIN_USER_SUCCESS, data};
}


export function userRegisterSuccess(data) {
  return {type: types.REGISTER_USER_SUCCESS, data};
}


export function userRegisterFail(data) {
  return {type: types.REGISTER_USER_FAIL, data};
}


export function forgotPasswordSuccess(response) {
  return {type: types.FORGOT_PASSWORD_SUCCESS, response};
}


export function logoutSuccess(response) {
  return {type: types.LOGOUT_SUCCESS, response};
}


const registerUser = function (user) {
  return function(dispatch) {
    return authApi.registerUser(user).then((user) => {
      dispatch(userRegisterSuccess(user));
    }).catch(error => {
      dispatch(userRegisterFail({registerFail: true, user: {}}))
    });
  }
};


const loginUser = function (user) {
  return function(dispatch) {
    return authApi.loginUser(user).then((user) => {
      dispatch(userLoginSuccess(user));
    }).catch(error => {
      dispatch(userRegisterFail({registerFail: true, user: {}}))
    });
  }
};


const forgotPassword = function (email) {
  return function(dispatch) {
    return authApi.forgotPassword(email).then((response) => {
      dispatch(forgotPasswordSuccess(response));
    })
  }
};


const logoutUser = function () {
  return function(dispatch) {
    return authApi.logoutUser().then((response) => {
      dispatch(logoutSuccess(response));
    })
  }
};


export { registerUser, loginUser, forgotPassword, logoutUser};
