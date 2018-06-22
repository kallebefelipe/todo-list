import AddTask from '../tasks/AddTask';
import Popup from "reactjs-popup";
import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getUsers } from '../../actions/user';
import { updateTask, deleteTask } from '../../actions/tasks';
import TaskRow from '../../components/tasks/TaskRow';


class TaskListRow extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      data: undefined,
      newName: undefined,
      update: false
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
    return <Popup className="popup-task" trigger={
          <Button className="btn-task"><Glyphicon glyph="glyphicon glyphicon-pencil" /></Button>}
        position="top left">
        {close => (
          <div>
            <AddTask todo={this.props.todo} task={this.props.task} close={close}/>
            <a className="close" onClick={close}>Cancel</a>
          </div>
        )}
      </Popup>
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
    return (
      <TaskRow
        task={this.props.task}
        getAssignName={this.getAssignName}
        deleteTask={this.deleteTask}
        editForm={this.editForm}
        updateDoneTask={this.updateDoneTask}
      />
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
