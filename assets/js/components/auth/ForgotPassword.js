import React from 'react';
import { connect } from 'react-redux';
import { FormGroup, Form, ControlLabel,
  InputGroup, FormControl, Button } from 'react-bootstrap';
import { forgotPassword } from '../../actions/auth';


class ForgotPassword extends React.Component {

  state = {
    email : ''
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.mapForgotPassword(this.state.email)
  }

  render () {
    return <Form>
      <FormGroup>
        <InputGroup>
          <InputGroup.Addon>@</InputGroup.Addon>
          <FormControl
              onChange={(e) => {
              const value = e.target.value;
              this.setState(() => ({
              email: value
            }));
          }}
          type="email" placeholder="Email" name='email' />
        </InputGroup>
        <Button type="submit"
          onClick={(e) => (this.handleSubmit(e))}>Submit</Button>
      </FormGroup>
    </Form>
  }
};

const mapDispatchToProps = dispatch => {
  return {
    mapForgotPassword: (email) => {
      return dispatch(forgotPassword(email));
    }
  }
}

export default connect(()=> ({}), mapDispatchToProps)(ForgotPassword);
