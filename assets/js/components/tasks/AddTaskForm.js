import React from 'react';
import { addTask } from '../../actions/tasks';
import { getUsers } from '../../actions/user';
import { Button, ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link, browserHistory} from 'react-router';
import { updateTask } from '../../actions/tasks';


class AddTaskForm extends React.Component {
  state = {
    assign_title: 'Assign',
    user: undefined,
    done: false,
    name: '',
    deadline: '',
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
  };

  updateValue = (e, data) => {
    const value = e.target.value;
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
      <form>
        <input
          onChange={(e) => {this.updateValue(e, {name: e.target.value})}}
          type="text" placeholder="Name"
          value={this.state.name}
          />

        <input
          onChange={(e) => {this.updateValue(e, {deadline: e.target.value})}}
          value={this.state.deadline}
          type="date"
          />

        <ButtonToolbar>
          <DropdownButton
            title={this.state.assign_title}
            id="dropdown-size-medium">
            {this.generateUserList()}
          </DropdownButton>
        </ButtonToolbar>

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
