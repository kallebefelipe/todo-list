import React from 'react';
import { connect } from 'react-redux';
import { FormGroup, Form, ControlLabel,
  InputGroup, FormControl, Col, Button } from 'react-bootstrap';
import { forgotPassword } from '../../actions/auth';
import ForgotPasswordForm from '../../components/auth/ForgotPasswordForm';


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

  updateEmail = (e) => {
    const value = e.target.value;
    this.setState(() => ({email: value}));
  }

  render () {
    return (
     <ForgotPasswordForm
      showMessage={this.showMessage}
      updateEmail={this.updateEmail}
      hdlSubmit={this.handleSubmit}
     />
    )
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
