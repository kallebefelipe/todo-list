import AddTodo from './todos/AddTodo';
import React from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/auth';
import { Button } from 'react-bootstrap';


const Header = (props) => (
  <header>
    <h1>TODO-LIST APP</h1>
      <AddTodo />
    <Button onClick={() => {props.mapLogoutUser()}}>Logout</Button>
  </header>
);

const mapDispatchToProps = dispatch => {
  return {
    mapLogoutUser: () => {
      dispatch(logoutUser());
    }
  }
}


export default connect(() => ({}), mapDispatchToProps)(Header);
