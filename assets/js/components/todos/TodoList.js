import React from 'react';
import TodoListRow from './TodoListRow';
import { connect } from 'react-redux';
import { loadTodos } from '../../actions/todos';


class TodoList extends React.Component {

    componentDidMount() {
        this.props.fetchTodos(this.props.token);
    }
    render () {
        return (
            <div>
                <p>TODO-LISTS</p>
                <ul>
                    {this.props.todos ? this.props.todos.map(todo =>
                        <TodoListRow key={todo.id} todo={todo} />
                    ) : 'Loading...'}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        todos: state.todoReducer.todos,
        token: state.authReducer.token,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchTodos: (token) => {
            dispatch(loadTodos(token));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
