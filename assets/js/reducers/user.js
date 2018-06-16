const authState = {
    users: [],
}

const userReducer = (state= authState, action) => {
    switch(action.type) {
        case 'LOAD_USER_SUCCESS':
            return {
                users: action.users
            };
        default:
            return state
    }
}

export default userReducer;
