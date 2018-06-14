import React from 'react';
import { connect } from 'react-redux';
import { deleteTask } from '../../actions/tasks';
import { updateTask } from '../../actions/tasks';


class TaskListRow extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: undefined,
            newName: undefined,
            update: false,
        };
    }

    deleteTask = (event) => {
        this.props.propDeleteTask({
            task: this.props.task,
            todo: this.props.todo,

        }, this.props.token);
    }

    toEditTask = (event) => {
        this.setState(() => ({
            update: true
        }));
    }

    subUpdateTask = (event) => {
        this.props.task.name = this.state.newName;
        this.props.mapUpdateTask({
            task: this.props.task
        }, this.props.token);
        this.setState(() => ({
            update: false
        }));
    }

    editForm = (event) => {
        return <div> {
            this.state.update ?
                <div>
                <input onChange={(e) => {
                    const value = e.target.value;
                    this.setState(() => ({
                        newName: value
                    }));
                }} type="text" placeholder="Name" />
                <button type="submit" onClick={this.subUpdateTask}>Ok</button>
                </div>
                :
                <button type="submit" onClick={this.toEditTask}>Edit</button>
            }
        </div>
    }


    render() {
        return (
            <div>
                <p>{this.props.task.name}</p>
                    <button type="submit" onClick={this.deleteTask}>Remove</button>
                    {this.editForm()}
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        token: state.authReducer.token,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        propDeleteTask: (task, token) => {
            dispatch(deleteTask(task, token));
        },
        mapUpdateTask: (task, token) => {
            dispatch(updateTask(task, token));
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskListRow);
