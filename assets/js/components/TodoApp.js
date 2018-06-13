 import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import AddTodoForm from './todos/AddTodoForm';
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
            <div>
                <Header />
                <AddTodoForm />
                <TodoList />
            </div>
        );
    }
}



export default TodoApp;
