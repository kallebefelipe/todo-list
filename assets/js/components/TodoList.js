import React import 'react';
import

const TodoList = (props) => {

    const ListTodos = () => {
        props.todos.map((todo) => {
            return <Todo key= name={todo.name} tasks={todo.tasks} />
        });
    }
};

export default TodoList;
