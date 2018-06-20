import React from 'react';
import Register from './Register';
import { connect } from 'react-redux';
import { FormGroup, Form, Col, ControlLabel, FormControl, Checkbox, Button } from 'react-bootstrap';
import { loginUser } from '../../actions/auth';
import { Redirect } from 'react-router';
import { Route } from 'react-router-dom';
import {browserHistory} from 'react-router';
import {Link} from "react-router-dom";


class Login extends React.Component {
  state = {
    username: '',
    password: '',
    token: '',
    isAuthenticated: false,
    submited: false
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.mapLoginUser({
      username: this.state.username,
      password: this.state.password
    });
    this.setState(() => ({submited: true}))
  }

  showMessage = (authenticated) => {
    if (this.state.submited && !authenticated) {
      return <p className="lgn_invalid">Usename or login invalid.</p>
    }
  }

  render() {
    if (this.props.isAuthenticated === true) {
      return <Redirect to='/' />
    }
    return (
      <div className="auth">
        <Form horizontal>
          {this.showMessage(this.props.isAuthenticated)}
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
            <Button type="submit" onClick={this.handleSubmit}>Login</Button>
            <Button type="submit" onClick={(e) => (e.preventDefault())}>
            <Link to="/register">Register</Link></Button>
            <p className="fgt-ask">Forgot your <Link to="/forgot-password">password ?</Link></p>
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
    mapLoginUser: (user) => {
      dispatch(loginUser(user));
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);
