const authState = {
    username: '',
    email: '',
    token: localStorage.getItem("token"),
    user: undefined,
    isAuthenticated: false,
}

const userInfo = (action) => {
    return {
        token: action.data.token,
        email: action.data.user.email,
        username: action.data.user.username,
        user: action.data.user.id,
        isAuthenticated: true,
        status: action.status_code
    };
}

const authReducer = (state= authState, action) => {
    switch(action.type) {
        case 'REGISTER':
            localStorage.setItem("token", action.data.token);
            return {
                token: action.token,
                email: action.email,
                username: action.username,
            };
            break;
        case 'LOGIN_USER_SUCCESS':
            localStorage.setItem("token", action.data.token);
            return userInfo(action);
        case 'REGISTER_USER_SUCCESS':
            return userInfo(action);
        case 'FORGOT_PASSWORD_SUCCESS':
            return userInfo(action);
        case 'LOGOUT_SUCCESS':
            localStorage.removeItem("token");
            return {
                token: '',
                email: '',
                username: '',
                user: '',
                isAuthenticated: false,
                status: action.status_code
            }
        default:
            return state
    }
}

export default authReducer;
