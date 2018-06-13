import React from 'react';
import { connect } from 'react-redux';
import { deleteTodo } from '../../actions/todos';
import { updateTodo } from '../../actions/todos';
import AddTaskForm from '../tasks/AddTaskForm';
import TaskList from '../tasks/TaskList';


class TodoListRow extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: undefined,
            newName: undefined,
            update: false,
        };
        this.subDeleteTodo = this.subDeleteTodo.bind(this);
        this.toEditTodo = this.toEditTodo.bind(this);
        this.subDeleteTodo = this.subDeleteTodo.bind(this);
        this.editForm = this.editForm.bind(this);
    }

    subDeleteTodo(event) {
        this.props.mapDeleteTodo(
            this.props.todo
        );
    }

    toEditTodo(event) {
        this.setState(() => ({
            update:true
        }));
    }

    subUpdateTodo = (event) => {
        this.props.todo.name = this.state.newName;
        this.props.mapUpdateTodo(
            this.props.todo
        );
        this.setState(() => ({
            update:false
        }));
    };

    editForm(event) {
        return <div>
            {
                this.state.update ?
                    <div>
                    <input onChange={(e) => {
                        const value = e.target.value;
                        this.setState(() => ({
                            newName: value
                        }));
                    }} type="text" placeholder="Name" />
                    <button type="submit" onClick={this.subUpdateTodo}>Ok</button>
                    </div>
                    :
                    <button type="submit" onClick={this.toEditTodo}>Edit</button>
            }
        </div>
    }

    render() {
        console.log('TodoListRow')
        return (
            <div>
                {this.props.todo.name}
                <button type="submit" onClick={this.subDeleteTodo}>Remove</button>
                {this.editForm()}
                <AddTaskForm todo={this.props.todo} />
                <TaskList tasks={this.props.todo.tasks} todo={this.props.todo} />
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        todos: state.todoReducer.todos
    }
}

const mapDispatchToProps = dispatch => {
    return {
        mapDeleteTodo: (todo) => {
            dispatch(deleteTodo(todo));
        },
        mapUpdateTodo: (todo) => {
            dispatch(updateTodo(todo));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoListRow);
