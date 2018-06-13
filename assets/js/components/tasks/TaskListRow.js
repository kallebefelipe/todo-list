import React from 'react';
import { connect } from 'react-redux';
import { deleteTask } from '../../actions/tasks';


class TaskListRow extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: undefined,
        };
        this.deleteTask = this.deleteTask.bind(this);
    }

    deleteTask(event) {
        this.props.dispatch(deleteTask({
            todo: this.props.todo,
            task: this.props.task
        }));
        window.location.reload(true);
    }

    render() {
        return (
            <div>
                <p key={this.props.task.id}>{this.props.task.name}
                    <button type="submit" onClick={this.deleteTask}>Remove</button>
                    <button type="submit">Edit</button>
                 </p>
            </div>
        )
    }
};

export default connect()(TaskListRow);
