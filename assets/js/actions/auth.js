import authApi from '../api/AuthApi';


const register = (user) => ({
    type: 'REGISTER',
    email: user.email,
    username: user.username,
    token: user.token
});

export function userLoginSuccess(data) {
    return {type: 'LOGIN_USER_SUCCESS', data};
}

const loginUser = function (user) {
    return function(dispatch) {
        return authApi.loginUser(user).then((user) => {
            dispatch(userLoginSuccess(user));
        })
    }
};

export { register, loginUser };
