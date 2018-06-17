import AddTaskForm from '../tasks/AddTaskForm';
import Popup from "reactjs-popup";
import React from 'react';
import { connect } from 'react-redux';
import { updateTask, deleteTask } from '../../actions/tasks';
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
    this.props.mapDeleteTask({
        task: this.props.task,
        todo: this.props.todo
      },
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

  render() {
    return (
      <li className="responded"><span>{this.props.task.name}</span>
        <label>
          <input type="checkbox"
            onChange={(e) => {
              const value = e.target.value;
              this.updateDoneTask(value);
          }}/>Done
        </label>
        <Button type="submit" onClick={(e) => this.deleteTask(e)}>Remove</Button>
        {this.editForm()}
      </li>
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
        },
        mapDeleteTask: (task, token) => {
          dispatch(deleteTask(task,token))
        },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(TaskListRow);
