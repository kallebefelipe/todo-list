import userApi from '../api/UserApi';

export function getUsersSuccess(data) {
    return {type: 'LOAD_USER_SUCCESS', users: data};
}

const getUsers = function (token) {
    return function(dispatch) {
        return userApi.getAllUser(token).then((users) => {
            dispatch(getUsersSuccess(users));
        })
    }
};

export { getUsers };
