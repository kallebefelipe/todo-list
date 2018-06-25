import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

const TaskRow = (props) => {
  return <li className="responded">
    <span>{props.task.done ? <strike>{props.task.name}</strike> : props.task.name}</span>
    <label>
      <input type="checkbox"
        checked={props.task.done}
        onChange={(e) => {const value = e.target.value; props.updateDoneTask(value);}}
        />Done
    </label>
    <h6>Deadline: {props.task.deadline.split(' ')[0]}</h6>
    <h6>Assign: {props.getAssignName(props.task.user)}</h6>

    <Button className="btn-task" type="submit" onClick={(e) => props.deleteTask(e)}>
      <Glyphicon glyph="glyphicon glyphicon-trash" />
    </Button>
    {props.editForm()}
  </li>
}


export default TaskRow;

