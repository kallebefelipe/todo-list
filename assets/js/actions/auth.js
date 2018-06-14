import authApi from '../api/AuthApi';

export function userLoginSuccess(data) {
    return {type: 'LOGIN_USER_SUCCESS', data};
}

export function userRegisterSuccess(data) {
    return {type: 'REGISTER_USER_SUCCESS', data};
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

export { registerUser, loginUser };
