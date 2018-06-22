import Header from './Header';
import PropTypes from 'prop-types';
import React from 'react';
import TodoList from './todos/TodoList';
import { connect } from 'react-redux';
import { populateInitialState } from '../actions/todos';


class TodoApp extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      data: undefined,
      };
    }

  render() {
    return (
      <div className="App">
        <Header />
        <TodoList />
      </div>
    );
  }
}


export default TodoApp;
