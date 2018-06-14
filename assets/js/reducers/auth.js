const authState = {
    username: '',
    email: '',
    token: '',
    isAuthenticated: false,
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
            return {
                token: action.data.token,
                email: action.data.user.email,
                username: action.data.user.username,
                isAuthenticated: true,
            };
        default:
            return state
    }
}

export default authReducer;
