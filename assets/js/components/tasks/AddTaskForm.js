import React from 'react';
import { addTask } from '../../actions/tasks';
import { Button, ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getUsers } from '../../actions/user';
import { Link, browserHistory} from 'react-router';
import { updateTask } from '../../actions/tasks';


class AddTaskForm extends React.Component {
  state = {
    assign_title: 'Assign',
    user: undefined,
    done: false,
    name: '',
    deadline: '',
    erros: {
      name: false,
      date: false
    }
  }

  componentDidMount() {
    this.setState(() => (this.props.task));
    this.setState(() => ({user: this.props.user}));

    this.props.mapGetUsers(this.props.token)
    if (this.props.task === undefined){
      this.setState(() => ({name: ''}));
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.props.task) {
      this.props.mapUpdateTask(this.state, this.props.token);
    }else{
      this.props.addNewTask({
        name: this.state.name,
        todo: this.props.todo.id,
        user: this.state.user,
        deadline: this.state.deadline},
        this.props.token);
    }
    let len_name = this.state.name.length
    let len_date = this.state.deadline.length
    this.setState(() => ({
      erros: {
        name: len_name === 0,
        date: len_date === 0,
      }
    }))

    if (len_name != 0 && len_date != 0) {
      if (this.props.onHide) {
        this.props.onHide()
      }
      if (this.props.close) {
        this.props.close()
      }
    }
  };

  updateDataValue = (e, data) => {
    const value = e.target.value;
    this.setState(() => ({deadline: `${data} 00:00:00`}));
  };

  updateValue = (e, data) => {
    this.setState(() => (data));
  };

  generateUserList = () => {
    return (
      this.props.users.map(user =>
        <MenuItem
          eventKey={user.id}
          key={user.id}
          onClick={(e) => {this.setState({assign_title: user.username, user: user.id});}}>
          {user.username}
        </MenuItem>
      )
    )
  };

  render() {
    return (
      <form className="form-task">
        <label>Task Name:</label>
        <input
          onChange={(e) => {this.updateValue(e, {name: e.target.value})}}
          type="text" placeholder="Task Name"
          value={this.state.name}
          className={this.state.erros.name ? "error" : ""}
        />

        <label>Deadline:</label>
        <input
          onChange={(e) => {this.updateDataValue(e, e.target.value)}}
          value={this.state.deadline.split(' ')[0]}
          type="date"
          className={this.state.erros.date ? "error" : ""}
          required="required"
        />

        <div className="assign">
          <ButtonToolbar className="assign">
            <DropdownButton
              title={this.state.assign_title}
              id="dropdown-size-medium">
              {this.generateUserList()}
            </DropdownButton>
          </ButtonToolbar>
        </div>

        <Button type="submit" onClick={this.handleSubmit}>Save</Button>
      </form>
    );
  }
};


const mapStateToProps = state => {
  return {
    token: state.authReducer.token,
    users: state.userReducer.users,
    user: state.authReducer.user,
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
    mapGetUsers: (token) => {
      dispatch(getUsers(token));
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(AddTaskForm);
