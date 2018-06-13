import React from 'react';
import TaskListRow from './TaskListRow';


const TaskList = ({tasks, todo}) => {
    return (
        <table classname="table">
            <thead>
                <tr>
                    <th>Tasks</th>
                </tr>
            </thead>
            <tbody>
                {tasks ? tasks.map(task =>
                    <TaskListRow key={task.id} task={task} todo={todo}/>
                ) : 'Loading...'}
            </tbody>
        </table>
    );
};

export default TaskList;
