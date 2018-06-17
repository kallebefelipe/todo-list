
class UserApi {

    static getAllUser(token) {
        return fetch('api/user/', {
                headers: {
                        'Authorization': `Token ${token}`,
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                },
            ).then((response) =>  {
                return response.json();
            })
    }
}

export default UserApi;
