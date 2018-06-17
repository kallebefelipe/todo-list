import authApi from '../api/AuthApi';


export function userLoginSuccess(data) {
  return {type: 'LOGIN_USER_SUCCESS', data};
}


export function userRegisterSuccess(data) {
  return {type: 'REGISTER_USER_SUCCESS', data};
}


export function forgotPasswordSuccess(response) {
  return {type: 'FORGOT_PASSWORD_SUCCESS', response};
}


export function logoutSuccess(response) {
  return {type: 'LOGOUT_SUCCESS', response};
}


const registerUser = function (user) {
  return function(dispatch) {
    return authApi.registerUser(user).then((user) => {
      dispatch(userLoginSuccess(user));
    })
  }
};


const loginUser = function (user) {
  return function(dispatch) {
    return authApi.loginUser(user).then((user) => {
      dispatch(userLoginSuccess(user));
    })
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
