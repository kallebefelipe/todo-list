import React from 'react';
import Register from './Register';
import { connect } from 'react-redux';
import { FormGroup, Form, Col, ControlLabel, FormControl, Checkbox, Button } from 'react-bootstrap';
import { loginUser } from '../../actions/auth';
import { Redirect } from 'react-router';
import { Route } from 'react-router-dom';
import {browserHistory} from 'react-router';
import {Link} from "react-router-dom";
import LoginForm from '../../components/auth/LoginForm';


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
    if (this.props.registerFail) {
      return <p className="lgn_invalid">Usename or login invalid.</p>
    }
  }

  updateState = (e, field) => {
    const value = e.target.value;
    if (field === 'login') {
      this.setState(() => ({username: value}));
    }else{
      this.setState(() => ({password: value}));
    }
  }

  render() {
    if (this.props.isAuthenticated === true) {
      return <Redirect to='/' />
    }
    return (
      <LoginForm
        showMessage={this.showMessage}
        isAuthenticated={this.isAuthenticated}
        updateState={this.updateState}
        handleSubmit={this.handleSubmit}
      />
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
    mapLoginUser: (user) => {
      dispatch(loginUser(user));
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);
