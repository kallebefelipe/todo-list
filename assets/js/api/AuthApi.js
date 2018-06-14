
class AuthApi {

    static loginUser(data) {
        return fetch('api/auth/login/', {
                method: 'POST',
                headers: {
                        'Content-type': 'application/json',
                    },
                body: JSON.stringify(data)
                },

            ).then((response) =>  {
                return response.json();
            })
    }
}

export default AuthApi;
