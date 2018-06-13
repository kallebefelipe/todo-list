const authState = {
    username: '',
    email: '',
    token: '',
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
        default:
            return state
    }
}

export default authReducer;
