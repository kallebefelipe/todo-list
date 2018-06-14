const authState = {
    username: '',
    email: '',
    token: '',
    isAuthenticated: false,
}

const userInfo = (action) => {
    return {
        token: action.data.token,
        email: action.data.user.email,
        username: action.data.user.username,
        isAuthenticated: true,
    };
}

const authReducer = (state= authState, action) => {
    switch(action.type) {
        case 'REGISTER':
            return {
                token: action.token,
                email: action.email,
                username: action.username,
            };
            break;
        case 'LOGIN_USER_SUCCESS':
            return userInfo(action);
        case 'REGISTER_USER_SUCCESS':
            return userInfo(action);
        default:
            return state
    }
}

export default authReducer;
