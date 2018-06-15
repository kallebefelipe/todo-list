import React from 'react';
import { Button } from 'react-bootstrap';
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
                <Button type="button" class="btn btn-outline-dark"
                 onClick={this.handleSubmit}>Add todo list</Button>
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
