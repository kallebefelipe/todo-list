const register = (user) => ({
    type: 'REGISTER',
    email: user.email,
    username: user.username,
    token: user.token
});

export { register };
