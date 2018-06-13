 import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import AddTodoForm from './todos/AddTodoForm';
import TodoList from './todos/TodoList';
import { connect } from 'react-redux';
import { loadTodos } from '../actions/todos';
import { populateInitialState } from '../actions/todos';


class TodoApp extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: undefined,
        };
    }

    componentDidMount() {
        fetch('/api/todos/',{
                method: 'GET',
                headers: {
                    'Authorization': "Token a454e53304779130a63789f2440f505182679f8d",
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            })
            .then((response) => response.json())
            .then((responseData) => {
                this.props.dispatch(populateInitialState(responseData));
                this.setState(() => ({
                    data:responseData
                }));
            })
    }

    render() {
        const todos = this.state.data;
        return (
            <div>
                <Header />
                <AddTodoForm />
                <TodoList todos={todos} />
            </div>
        );
    }
}

export default connect()(TodoApp);
