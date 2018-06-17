import AddTodoForm from './todos/AddTodoForm';
import React from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/auth';


const Header = (props) => (
  <header>
    <h1>TODO-LIST APP</h1>
    <p>Todo-List</p>
      <AddTodoForm />
    <button onClick={() => {props.mapLogoutUser()}}>Logout</button>
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
