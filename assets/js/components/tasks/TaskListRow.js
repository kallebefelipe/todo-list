import AddTaskForm from '../tasks/AddTaskForm';
import Popup from "reactjs-popup";
import React from 'react';
import { connect } from 'react-redux';
import { updateTask } from '../../actions/tasks';
import { Button } from 'react-bootstrap';


class TaskListRow extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: undefined,
            newName: undefined,
            update: false,
        };
    }

    deleteTask = (event) => {
        this.props.propDeleteTask({
            task: this.props.task,
            todo: this.props.todo,

        }, this.props.token);
    }

    editForm = (event) => {
        return <div>
            <Popup trigger={<Button>Edit Task</Button>} position="top left">
                {close => (
                  <div>
                    <AddTaskForm todo={this.props.todo} task={this.props.task} />
                    <a className="close" onClick={close}>
                      Cancel
                    </a>
                  </div>
                )}
              </Popup>

        </div>
    }

    updateDoneTask = (event) => {
        this.props.task.done = !this.props.task.done;
        const task = this.props.task;
        this.props.mapUpdateTask(task, this.props.token);
    }

    render() {
        return (
            <div>
                <p>{this.props.task.name}</p>
                    <input type="checkbox"
                      onChange={(e) => {
                        const value = e.target.value;
                        this.updateDoneTask(value);
                    }} />Done
                    <Button type="submit" onClick={this.deleteTask}>Remove</Button>
                    {this.editForm()}
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        token: state.authReducer.token,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addNewTask: (task, token) => {
            dispatch(addTask(task, token));
        },
        mapUpdateTask: (task, token) => {
            dispatch(updateTask(task, token));
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(TaskListRow);
