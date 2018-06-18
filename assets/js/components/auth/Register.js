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
      <div className="auth">
      <Form horizontal>
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
              name='email' />
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
