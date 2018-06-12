import React from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../actions/todos';


class AddTodoForm extends React.Component {
    state = {
        inputValue: ''
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this)
        this.props.dispatch(addTodo({
            name: this.state.inputValue,
            tasks: []
        }));
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
                <button type="submit" onClick={this.handleSubmit}>Add todo list</button>
            </form>
        );
    }

};

export default connect()(AddTodoForm);
