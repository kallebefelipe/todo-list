import React from 'react';
import { connect } from 'react-redux';
import { FormGroup, Form, Col, ControlLabel, FormControl, Checkbox, Button, InputGroup } from 'react-bootstrap';
import { Redirect} from 'react-router';
import { registerUser } from '../../actions/auth';


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
    console.log(this.state.username, 'username')
    console.log(this.state.password, 'password')
    console.log(this.state.email, 'email')
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

  render() {
    if (this.props.isAuthenticated === true) {
      return <Redirect to='/' />
    }
    console.log(this.props)
    return (
      <div className="auth">
      <Form horizontal>
        {this.showMessage()}
        <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} sm={2}>
            Email
          </Col>
          <InputGroup>
            <InputGroup.Addon>@</InputGroup.Addon>
            <FormControl
              onChange={(e) => {const value = e.target.value; this.setState(() => ({email: value}));}}
              type="email"
              placeholder="Email"
              className={this.state.erros.email ? "error" : ""}
              name='email'/>
          </InputGroup>
        </FormGroup>
        <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} sm={2}>
            Login
          </Col>
          <Col sm={10}>
            <FormControl
              onChange={(e) => {const value = e.target.value; this.setState(() => ({username: value}));}}
              type="login"
              className={this.state.erros.username ? "error" : ""}
              placeholder="Login" />
          </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalPassword">
          <Col componentClass={ControlLabel} sm={2}>
            Password
          </Col>
          <Col sm={10}>
          <FormControl
            onChange={(e) => {const value = e.target.value; this.setState(() => ({password: value}));}}
            type="password"
            className={this.state.erros.password ? "error" : ""}
            placeholder="Password" />
          </Col>
        </FormGroup>
        <FormGroup>
            <Col smOffset={2} sm={10}>
            <Button type="submit" onClick={this.handleSubmit}>Register</Button>
            </Col>
          </FormGroup>
        </Form>
      </div>

    );
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
