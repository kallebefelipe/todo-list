import React from 'react';
import { addTask } from '../../actions/tasks';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link, browserHistory} from 'react-router';
import { updateTask } from '../../actions/tasks';


class AddTaskForm extends React.Component {
    state = {
        name: '',
        deadline: '',
        task: {
            name: ''
        }
    }

    componentWillMount() {
        if (this.props.task === undefined){
            this.setState(() => (
                {name: ''}
            ));
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if (this.props.task) {
            this.props.mapUpdateTask({
                name: this.state.name,
                task: this.props.task.id,
                todo: this.props.todo.id,
        }, this.props.token);
        }else{
            this.props.addNewTask({
                name: this.state.name,
                todo: this.props.todo.id,
                deadline: this.state.deadline
            }, this.props.token);
        }
    };

    updateValue = (e, data) => {
        const value = e.target.value;
        this.setState(() => (data));
    };

    render() {
        return (
            <form>
                <input
                    onChange={(e) => {this.updateValue(e,
                    {name: e.target.value})}}
                    type="text" placeholder="Name"
                    value={this.state.name}
                    />
                <input
                    onChange={(e) => {this.updateValue(e,
                    {deadline: e.target.value})}}
                    type="date"
                    />
                <Button type="submit" onClick={this.handleSubmit}>Save</Button>
            </form>
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
        addNewTask: (task, token) => {
            dispatch(addTask(task, token));
        },
        mapUpdateTask: (task, token) => {
            dispatch(updateTask(task, token));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTaskForm);
