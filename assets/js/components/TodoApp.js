import React from 'react';
import Header from './Header';
import AddTodoForm from './AddTodoForm';


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
            </div>
        );
    }

    populateData = (data) => {
        this.setState(() => {
            return {
                data
            }
        });
        console.log(this.state)
    }

    componentDidMount() {
        fetch('/api/todos/')
            .then((response) => response.json())
            .then((responseData) => this.populateData(responseData))
    }
}

export default TodoApp;
