import React from 'react';
import { FormGroup, Form, Col, ControlLabel, FormControl, Checkbox, Button, InputGroup } from 'react-bootstrap';
import { Redirect} from 'react-router';


const RegisterForm = (props) => {
  return (
    <div className="auth">
    <Form horizontal>
      {props.showMessage()}
      <FormGroup controlId="formHorizontalEmail">
        <Col componentClass={ControlLabel} sm={2}>
          Email
        </Col>
        <InputGroup>
          <InputGroup.Addon>@</InputGroup.Addon>
          <FormControl
            onChange={(e) => {props.updateState(e, 'email')}}
            type="email"
            placeholder="Email"
            className={props.emailErro ? "error" : ""}
            name='email'/>
        </InputGroup>
      </FormGroup>
      <FormGroup controlId="formHorizontalEmail">
        <Col componentClass={ControlLabel} sm={2}>
          Login
        </Col>
        <Col sm={10}>
          <FormControl
            onChange={(e) => {props.updateState(e, 'login')}}
            type="login"
            className={props.usernameErro ? "error" : ""}
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
          className={props.passwordErro ? "error" : ""}
          placeholder="Password" />
        </Col>
      </FormGroup>
      <FormGroup>
          <Col smOffset={2} sm={10}>
          <Button type="submit" onClick={props.handleSubmit}>Register</Button>
          </Col>
        </FormGroup>
      </Form>
    </div>
  );
}


export default RegisterForm;
