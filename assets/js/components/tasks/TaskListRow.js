import AddTaskForm from '../tasks/AddTaskForm';
import Popup from "reactjs-popup";
import React from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getUsers } from '../../actions/user';
import { updateTask, deleteTask } from '../../actions/tasks';


class TaskListRow extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      data: undefined,
      newName: undefined,
      update: false,
    };
  }

  componentDidMount() {
    this.props.mapGetUsers(this.props.token)
  }

  deleteTask = (event) => {
    this.props.mapDeleteTask({
        task: this.props.task,
        todo: this.props.todo},
      this.props.token);
    }

  editForm = (event) => {
    return <div className="edit-task">
      <Popup trigger={<Button>Edit</Button>} position="top left">
        {close => (
          <div>
            <AddTaskForm todo={this.props.todo} task={this.props.task} />
            <a className="close" onClick={close}>Cancel</a>
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

  getAssignName = (id) => {
    let username = undefined
    this.props.users.map((user) => {
        if (id === user.id) {
          username = user.username
        }
      }
    );
    return username
  }

  render() {
    let task_name = this.props.task.name
    return (
      <li className="responded">
        <span>{this.props.task.done ? <strike>{task_name}</strike> : task_name}</span>
        <label>
          <input type="checkbox"
            checked={this.props.task.done}
            onChange={(e) => {const value = e.target.value; this.updateDoneTask(value);}}
            />Done
        </label>
        <h6>Deadline: {this.props.task.deadline.split(' ')[0]}</h6>
        <h6>Assign: {this.getAssignName(this.props.task.user)}</h6>

        <Button type="submit" onClick={(e) => this.deleteTask(e)}>Remove</Button>
        {this.editForm()}
      </li>
    )
  }
};


const mapStateToProps = state => {
  return {
    token: state.authReducer.token,
    users: state.userReducer.users,
  }
}


const mapDispatchToProps = dispatch => {
  return {
    addNewTask: (task, token) => {
      dispatch(addTask(task, token));
    },
    mapUpdateTask: (task, token) => {
      dispatch(updateTask(task, token));
    },
    mapDeleteTask: (task, token) => {
      dispatch(deleteTask(task,token))
    },
    mapGetUsers: (token) => {
      dispatch(getUsers(token));
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(TaskListRow);
