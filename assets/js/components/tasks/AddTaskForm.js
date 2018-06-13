import React from 'react';
import { addTask } from '../../actions/tasks';
import { connect } from 'react-redux';


class AddTaskForm extends React.Component {
    state = {
        inputValue: ''
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addNewTask({
            name: this.state.inputValue,
            todo: this.props.todo,
        });
    };

    render() {
        return (
            <form>
                <input
                    onChange={(e) => {
                        const value = e.target.value;
                        this.setState(() => ({
                            inputValue: value
                        }));
                    }} type="text" placeholder="Name" />
                <button type="submit" onClick={this.handleSubmit}>Add task</button>
            </form>
        );
    }

};

const mapDispatchToProps = dispatch => {
    return {
        addNewTask: (task) => {
            dispatch(addTask(task));
        }
    }
}

export default connect(() => ({}), mapDispatchToProps)(AddTaskForm);
