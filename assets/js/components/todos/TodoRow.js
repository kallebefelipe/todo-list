import React from 'react';
import { connect } from 'react-redux';
import { deleteTodo } from '../../actions/todos';
import { updateTodo } from '../../actions/todos';
import { Button, Glyphicon } from 'react-bootstrap';
import TaskList from '../../containers/tasks/TaskList';
import {Link} from "react-router-dom";
import Popup from "reactjs-popup";
import ModalTask from '../tasks/ModalTask';


const TodoRow = (props) => (
  <div className="todo">
    <h2>{props.todo.name}</h2>
    <Button type="submit" onClick={props.subDeleteTodo}>
      <Glyphicon glyph="glyphicon glyphicon-trash" />
    </Button>
    {props.editForm()}

    <TaskList tasks={props.todo.tasks} todo={props.todo} />

    <Button
      type="submit"
      onClick={() => props.updateShowModal()}
    >
      <Glyphicon glyph="glyphicon glyphicon-plus" />
    </Button>
      <ModalTask show={props.showModalTask} onHide={props.lgClose} todo={props.todo}/>
  </div>
)


export default TodoRow;
