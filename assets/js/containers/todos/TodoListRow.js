import React from 'react';
import { connect } from 'react-redux';
import { deleteTodo } from '../../actions/todos';
import { updateTodo } from '../../actions/todos';
import { Button, Glyphicon } from 'react-bootstrap';
import TaskListRow from '../tasks/TaskListRow';
import {Link} from "react-router-dom";
import Popup from "reactjs-popup";
import ModalTask from '../../components/tasks/ModalTask';
import TodoRow from '../../components/todos/TodoRow';


class TodoListRow extends React.Component {
  constructor(props, context) {
    super(props, context);
      this.state = {
        data: undefined,
        newName: undefined,
        update: false,
        showModalTask: false
      };
    this.subDeleteTodo = this.subDeleteTodo.bind(this);
    this.toEditTodo = this.toEditTodo.bind(this);
    this.subDeleteTodo = this.subDeleteTodo.bind(this);
    this.editForm = this.editForm.bind(this);
    }

  subDeleteTodo(event) {
    this.props.mapDeleteTodo(this.props.todo, this.props.token);
  }

  addTask(event) {
    this.props.mapDeleteTodo(this.props.todo, this.props.token);
  }

  toEditTodo(event) {
    this.setState(() => ({update: true}));
  }

  subUpdateTodo = (event) => {
    this.props.todo.name = this.state.newName;
    this.props.mapUpdateTodo({todo: this.props.todo}, this.props.token);
    this.setState(() => ({update: false}));
  };

  updateShowModal = () => {
    this.setState({ showModalTask: true })
  }

  editForm(event) {
    if (this.state.update) {
      return (
        <div>
          <input
            onChange={(e) => {const value = e.target.value; this.setState(() => ({newName: value}));}}
            type="text"
            placeholder="Name" />

          <Button type="submit" onClick={this.subUpdateTodo}>Ok</Button>
        </div>
      );
    }
    return (
      <Button type="submit" onClick={this.toEditTodo}>
        <Glyphicon glyph="glyphicon glyphicon-pencil" />
      </Button>
    )
  }

  render() {
    let lgClose = () => this.setState({ showModalTask: false });
    return (
      <TodoRow
        todo={this.props.todo}
        subDeleteTodo={this.subDeleteTodo}
        lgClose={lgClose}
        editForm={this.editForm}
        updateShowModal={this.updateShowModal}
        showModalTask={this.state.showModalTask}

      / >
    )
  }
};


const mapStateToProps = state => {
  return {
    todos: state.todoReducer.todos,
    token: state.authReducer.token,
  }
}


const mapDispatchToProps = dispatch => {
  return {
    mapDeleteTodo: (todo, token) => {
      dispatch(deleteTodo(todo, token));
    },
    mapUpdateTodo: (todo, token) => {
      dispatch(updateTodo(todo, token));
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(TodoListRow);
