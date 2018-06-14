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
        }, this.props.token);
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

const mapStateToProps = state => {
    return {
        token: state.authReducer.token,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addNewTodo: (todo, token) => {
            dispatch(addTodo(todo, token));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTodoForm);
