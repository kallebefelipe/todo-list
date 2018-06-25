import React from 'react';
import { connect } from 'react-redux';
import { FormGroup, Form, Col, ControlLabel, FormControl, Checkbox, Button, InputGroup } from 'react-bootstrap';
import { Redirect} from 'react-router';
import { registerUser } from '../../actions/auth';
import RegisterForm from '../../components/auth/RegisterForm';


class Register extends React.Component {
  state = {
    email: '',
    username: '',
    password: '',
    token: '',
    isAuthenticated: false,
    erros: {
      email: false,
      username: false,
      password: false
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()

    this.props.mapRegisterUser({
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
    });

    this.setState(() => ({
      erros: {
        email: this.state.email.length === 0,
        username: this.state.username.length === 0,
        password: this.state.password.length === 0,
      }
    }))
  }

  showMessage = () => {
    if (this.props.registerFail) {
      return <p className="lgn_invalid">User already exists or inválid email.</p>
    }
  }

  updateState = (e, field) => {
    const value = e.target.value;
    if (field === 'login') {
      this.setState(() => ({username: value}));
    }else if (field === 'email'){
      this.setState(() => ({email: value}));
    }else{
      this.setState(() => ({password: value}));
    }
  }

  render() {
    if (this.props.isAuthenticated === true) {
      return <Redirect to='/' />
    }
    return (
      <RegisterForm
        showMessage={this.showMessage}
        handleSubmit={this.handleSubmit}
        updateState={this.updateState}
        passwordErro={this.state.erros.password}
        usernameErro={this.state.erros.username}
        emailErro={this.state.erros.email}
      />
    )
  }
};


const mapStateToProps = state => {
  return {
    isAuthenticated: state.authReducer.isAuthenticated,
    registerFail: state.authReducer.registerFail,
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
