import React from 'react';
import { FormGroup, Form, Col, ControlLabel, FormControl, Checkbox, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";


const LoginForm = (props) => (
  <div className="auth">
    <Form horizontal>
      {props.showMessage(props.isAuthenticated)}
    <FormGroup controlId="formHorizontalEmail">
      <Col componentClass={ControlLabel} sm={2}>
        Login
      </Col>
      <Col sm={10}>
        <FormControl
          onChange={(e) => {props.updateState(e, 'login')}}
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
        onChange={(e) => {props.updateState(e, 'password')}}
        type="password"
        placeholder="Password" />
      </Col>
    </FormGroup>
    <FormGroup>
        <Col smOffset={2} sm={10}>
        <Button type="submit" onClick={props.handleSubmit}>Login</Button>
        <Button type="submit" onClick={(e) => (e.preventDefault())}>
          <Link to="/register">Register</Link></Button>
        <p className="fgt-ask">Forgot your <Link to="/forgot-password">password ?</Link></p>
        </Col>
      </FormGroup>
    </Form>
  </div>
);


export default LoginForm;
