import React from 'react';
import Header from './Header';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';


class TodoApp extends React.Component {
    state = {
        data: undefined
    }

    render() {
        console.log("vai renderizar")
        return (
            <div>
                <Header />
                <AddTodoForm />
                <TodoList />
            </div>
        );
    }
}

export default TodoApp;
