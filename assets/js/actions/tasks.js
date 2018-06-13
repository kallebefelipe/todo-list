import taskApi from '../api/TasksApi';

export function addTaskSuccess(task) {
    return {type: 'ADD_TASK_SUCCESS', task};
}

export function updateTaskSuccess(data) {
    return {
        type: 'UPDATE_TASK_SUCCESS',
        task: data.task,
        todo_id: data.todo.id,
    };
}

export function deleteTaskSuccess(data) {
    return {
        type: 'DELETE_TASK_SUCCESS',
        task: data.task,
        todo_id: data.todo.id,
    };
}

const addTask = function (task) {
    return function(dispatch) {
        return taskApi.addTask(task).then((newTask) => {
            dispatch(addTaskSuccess(newTask));
        })
    }
};

const deleteTask = (task) => {
    return (dispatch) => {
        return taskApi.deleteTask(task).then(() => {
            dispatch(deleteTaskSuccess(task));
        })
    }
};


const updateTask = (todo) => {
    return (dispatch) => {
        return taskApi.updateTask(todo).then(() => {
            dispatch(updateTaskSuccess(todo));
        })
    }
};

export { addTask, deleteTask, updateTask };
