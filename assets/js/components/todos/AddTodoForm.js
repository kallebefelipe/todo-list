import React from 'react';
import { Button } from 'react-bootstrap';
import { addTodo } from '../../actions/todos';
import { connect } from 'react-redux';


const AddTodoForm = (props) => (
  <form className='submit-todo'>
    <input
      onChange={(e) => {props.updateValue(e)}}
      type="text"
      placeholder="Name"
      required/>

    <Button type="button" className="btn btn-outline-dark"
      onClick={(e) => (props.handleSubmit(e))}>Add todo List</Button>
  </form>
)


export default AddTodoForm;
