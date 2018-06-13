import React from 'react';
import { connect } from 'react-redux';
import { addTask } from '../../actions/tasks';


class AddTaskForm extends React.Component {
    state = {
        inputValue: ''
    }

    handleSubmit = (e) => {
        this.props.dispatch(addTask({
            name: this.state.inputValue
        }));
        fetch('/api/tasks/', {
            method: 'POST',
            headers: {
                'Authorization': "Token a454e53304779130a63789f2440f505182679f8d",
                'Accept': 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                name: this.state.inputValue,
                todo: this.props.todo
            }).then((response) =>  {
                return response.status;
            })
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

export default connect()(AddTaskForm);
