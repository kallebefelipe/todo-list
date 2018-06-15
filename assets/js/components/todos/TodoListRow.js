import React from 'react';
import { connect } from 'react-redux';
import { deleteTodo } from '../../actions/todos';
import { updateTodo } from '../../actions/todos';
import { Button } from 'react-bootstrap';
import AddTaskForm from '../tasks/AddTaskForm';
import TaskList from '../tasks/TaskList';
import {Link} from "react-router-dom";
import Popup from "reactjs-popup";


class TodoListRow extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: undefined,
            newName: undefined,
            update: false,
        };
        this.subDeleteTodo = this.subDeleteTodo.bind(this);
        this.toEditTodo = this.toEditTodo.bind(this);
        this.subDeleteTodo = this.subDeleteTodo.bind(this);
        this.editForm = this.editForm.bind(this);
    }

    subDeleteTodo(event) {
        this.props.mapDeleteTodo(
            this.props.todo,
            this.props.token
        );
    }

    addTask(event) {
        this.props.mapDeleteTodo(
            this.props.todo,
            this.props.token
        );
    }

    toEditTodo(event) {
        this.setState(() => ({
            update: true
        }));
    }

    subUpdateTodo = (event) => {
        this.props.todo.name = this.state.newName;
        this.props.mapUpdateTodo({
            todo: this.props.todo}, this.props.token);
        this.setState(() => ({
            update: false
        }));
    };

    editForm(event) {
        return <div> {
            this.state.update ?
                <div>
                <input onChange={(e) => {
                    const value = e.target.value;
                    this.setState(() => ({
                        newName: value
                    }));
                }} type="text" placeholder="Name" />
                <Button type="submit" onClick={this.subUpdateTodo}>Ok</Button>
                </div>
                :
                <Button type="submit" onClick={this.toEditTodo}>Edit</Button>
            }
        </div>
    }

    render() {
        return (
            <div>
                {this.props.todo.name}
                <Button type="submit" onClick={this.subDeleteTodo}>Remove</Button>
                {this.editForm()}
                <TaskList tasks={this.props.todo.tasks} todo={this.props.todo} />
                    <Popup trigger={<Button>New Task</Button>} position="top left">
                    {close => (
                      <div>
                        <AddTaskForm todo={this.props.todo} />
                        <a className="close" onClick={close}>
                          Cancel
                        </a>
                      </div>
                    )}
              </Popup>
            </div>
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
