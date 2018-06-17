import React from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/auth';
import { Redirect} from 'react-router';

class Register extends React.Component {
  state = {
    email: '',
    username: '',
    password: '',
    token: '',
    isAuthenticated: false
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.mapRegisterUser({
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
    });
  }

  render() {
    if (this.props.isAuthenticated === true) {
      return <Redirect to='/' />
    }
    return (
      <div>
        <form>
          <input
            onChange={(e) => {
              const value = e.target.value;
              this.setState(() => ({email: value}));
            }}
            type="text" placeholder="email" />
          <input
            onChange={(e) => {
              const value = e.target.value;
              this.setState(() => ({username: value}));
            }} type="text" placeholder="Name" />
          <input
            onChange={(e) => {
              const value = e.target.value;
              this.setState(() => ({password: value}));
            }} type="password" placeholder="Password" />
          <button type="submit" onClick={this.handleSubmit}>Register</button>
        </form>
      </div>
      );
    }
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authReducer.isAuthenticated
  }
}

const mapDispatchToProps = dispatch => {
  return {
    mapRegisterUser: (user) => {
      dispatch(registerUser(user));
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
