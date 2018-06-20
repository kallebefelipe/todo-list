import React from 'react';
import { connect } from 'react-redux';
import { FormGroup, Form, ControlLabel,
  InputGroup, FormControl, Col, Button } from 'react-bootstrap';
import { forgotPassword } from '../../actions/auth';


class ForgotPassword extends React.Component {

  state = {
    email : '',
    submited: false
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.mapForgotPassword(this.state.email)
    this.setState(() => ({submited: true}))
  }

  showMessage = () => {
    if (this.state.submited) {
      return <p className="sub_email">Check your email.</p>
    }
  }

  render () {
    console.log(this.state.submited)
    return <div className="auth">
      <Form>
        <FormGroup>
          <InputGroup>
            <InputGroup.Addon>@</InputGroup.Addon>
            <FormControl
              onChange={(e) => {const value = e.target.value; this.setState(() => ({email: value}));}}
              type="email"
              placeholder="Email"
              name='email' />
          </InputGroup>
        </FormGroup>
        <FormGroup>
            <Col smOffset={2} sm={10} className="btn-forget">
              <Button type="submit" onClick={(e) => (this.handleSubmit(e))}>Submit</Button>
            </Col>
            {this.showMessage()}
          </FormGroup>
      </Form>
    </div>
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
