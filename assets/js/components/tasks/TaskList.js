import React from 'react';
import TaskListRow from './TaskListRow';


const TaskList = ({tasks, todo}) => {
    return (
        <div>
            <p>Tasks</p>
            <ul>
                {tasks ? tasks.map(task =>
                    <TaskListRow key={task.id} task={task} todo={todo}/>
                ) : 'Loading...'}
            </ul>
        </div>
    );
};

export default TaskList;
