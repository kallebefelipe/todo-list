import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import AddTask from '../../containers/tasks/AddTask'


const ModalTask = (props) => {
  return <Modal
    {...props}
    bsSize="large"
    aria-labelledby="contained-modal-title-lg"
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-lg">New Task</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <AddTask todo={props.todo} onHide={props.onHide}/>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={props.onHide}>Close</Button>
    </Modal.Footer>
  </Modal>

}


export default ModalTask;
