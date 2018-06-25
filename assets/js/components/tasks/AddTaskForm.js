import React from 'react';
import { Button, ButtonToolbar, DropdownButton } from 'react-bootstrap';
import { connect } from 'react-redux';


const AddTaskForm = (props) => (
  <form className="form-task">
    <label>Task Name:</label>
    <input
      onChange={(e) => {props.updateValue(e, {name: e.target.value})}}
      type="text" placeholder="Task Name"
      value={props.name}
      className={props.erroName ? "error" : ""}
    />

    <label>Deadline:</label>
    <input
      onChange={(e) => {props.updateDataValue(e, e.target.value)}}
      value={props.deadline.split(' ')[0]}
      type="date"
      className={props.erroDate ? "error" : ""}
      required="required"
    />

    <div className="assign">
      <ButtonToolbar className="assign">
        <DropdownButton
          title={props.assignTitle}
          id="dropdown-size-medium">
          {props.generateUserList()}
        </DropdownButton>
      </ButtonToolbar>
    </div>

    <Button type="submit" onClick={(e) => props.handleSubmit(e)}>Save</Button>
  </form>
);


export default AddTaskForm;
