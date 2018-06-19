import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import AddTaskForm from './AddTaskForm'

class ModalTask extends React.Component {
  render() {
    return (
      <Modal
        {...this.props}
        bsSize="large"
        aria-labelledby="contained-modal-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddTaskForm todo={this.props.todo} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}


export default ModalTask;
