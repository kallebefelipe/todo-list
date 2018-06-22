import React from 'react';
import { FormGroup, Form, ControlLabel,
  InputGroup, FormControl, Col, Button } from 'react-bootstrap';


const ForgotPasswordForm = (props) => (
  <div className="auth">
    <Form>
      <FormGroup>
        <InputGroup>
          <InputGroup.Addon>@</InputGroup.Addon>
          <FormControl
            onChange={(e) => {props.updateEmail(e)}}
            type="email"
            placeholder="Email"
            name='email' />
        </InputGroup>
      </FormGroup>
      <FormGroup>
          <Col smOffset={2} sm={10} className="btn-forget">
            <Button type="submit" onClick={(e) => {props.hdlSubmit(e)}}>Submit</Button>
          </Col>
          {props.showMessage()}
        </FormGroup>
    </Form>
    </div>
);


export default ForgotPasswordForm;
