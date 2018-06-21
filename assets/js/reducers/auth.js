
const authState = {
  username: '',
  email: '',
  token: localStorage.getItem("token"),
  user: undefined,
  isAuthenticated: false,
  registerFail: false
}


const userInfo = (action, authenticated) => {
  return {
    token: action.data.token,
    email: action.data.user.email,
    username: action.data.user.username,
    user: action.data.user.id,
    isAuthenticated: authenticated,
    status: action.status_code,
    registerFail: action.data.registerFail
  };
}


const authReducer = (state= authState, action) => {
  switch(action.type) {
    case 'LOGIN_USER_SUCCESS':
      localStorage.setItem("token", action.data.token);
      return userInfo(action, true);
    case 'REGISTER_USER_SUCCESS':
      localStorage.setItem("token", action.data.token);
      return userInfo(action, true);
    case 'REGISTER_USER_FAIL':
      return userInfo(action, false);
    case 'FORGOT_PASSWORD_SUCCESS':
      return userInfo(action, false);
    case 'LOGOUT_SUCCESS':
      localStorage.removeItem("token");
      return {
        token: '',
        email: '',
        username: '',
        user: '',
        isAuthenticated: false,
        status: action.status_code,
        registerFail: false
      }
    default:
        return state
  }
}


export default authReducer;
