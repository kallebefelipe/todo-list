import React from 'react';
import { Button } from 'react-bootstrap';
import { addTodo } from '../../actions/todos';
import { connect } from 'react-redux';
import AddTodoForm from '../../components/todos/AddTodoForm';

class AddTodo extends React.Component {
  state = {
    inputValue: ''
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.inputValue){
      this.props.addNewTodo({
          name: this.state.inputValue,
          tasks: this.state.tasks},
        this.props.token);
    }
  };

  updateValue = (e) => {
    const value = e.target.value;
    this.setState(() => ({inputValue: value}));
  }

  render() {
    return (
      <AddTodoForm
        handleSubmit={this.handleSubmit}
        updateValue={this.updateValue}
      />
    );
  }
};


const mapStateToProps = state => {
  return {
    token: state.authReducer.token,
  }
}


const mapDispatchToProps = dispatch => {
  return {
    addNewTodo: (todo, token) => {
      dispatch(addTodo(todo, token));
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(AddTodo);
