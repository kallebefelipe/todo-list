import getCookie from '../common/helpers'


class AuthApi {

  static loginUser(data) {
    return fetch('api/auth/login/', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        },
      body: JSON.stringify(data)
      }).then((response) =>  {
        return response.json();
      })
    }

  static registerUser(data) {
    return fetch('api/auth/register/', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        },
      body: JSON.stringify(data)
      }).then((response) =>  {
      return response.json();
      })
    }

  static forgotPassword(email) {
    const csrf = getCookie('csrftoken')
    return fetch('/rest-auth/password/reset/', {
      method: 'POST',
      mode: 'same-origin',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'X-CSRFToken': csrf
        },
      body: JSON.stringify({
      email: email
        })
      }).then((response) =>  {
        return response.json();
      })
    }

  static logoutUser() {
    return fetch('rest-auth/logout/ ', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        },
      }).then((response) =>  {
        return response.json();
      })
    }
}


export default AuthApi;
