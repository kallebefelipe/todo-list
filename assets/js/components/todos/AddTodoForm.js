import React from 'react';
import { addTodo } from '../../actions/todos';
import { connect } from 'react-redux';


class AddTodoForm extends React.Component {
    state = {
        inputValue: ''
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addNewTodo({
            name: this.state.inputValue,
            tasks: this.state.tasks,
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
                <button type="submit" onClick={this.handleSubmit}>Add todo list</button>
            </form>
        );
    }

};

const mapDispatchToProps = dispatch => {
    return {
        addNewTodo: (todo) => {
            dispatch(addTodo(todo));
        }
    }
}

export default connect(() => ({}), mapDispatchToProps)(AddTodoForm);
