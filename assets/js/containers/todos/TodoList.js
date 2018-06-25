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
      <div className="main text-center">
        {this.props.todos.map(todo => <TodoListRow key={todo.id} todo={todo} />)}
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
