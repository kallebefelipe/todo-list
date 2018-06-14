import taskApi from '../api/TasksApi';

export function addTaskSuccess(task) {
    return {type: 'ADD_TASK_SUCCESS', task};
}

export function updateTaskSuccess(data) {
    return {
        type: 'UPDATE_TASK_SUCCESS',
        task: data.task
    };
}

export function deleteTaskSuccess(data) {
    return {
        type: 'DELETE_TASK_SUCCESS',
        task: data.task,
        todo_id: data.todo.id,
    };
}

const addTask = function (task, token) {
    return function(dispatch) {
        return taskApi.addTask(task, token).then((newTask) => {
            dispatch(addTaskSuccess(newTask));
        })
    }
};

const deleteTask = (task, token) => {
    return (dispatch) => {
        return taskApi.deleteTask(task, token).then(() => {
            dispatch(deleteTaskSuccess(task));
        })
    }
};


const updateTask = (todo, token) => {
    return (dispatch) => {
        return taskApi.updateTask(todo, token).then(() => {
            dispatch(updateTaskSuccess(todo));
        })
    }
};

export { addTask, deleteTask, updateTask };
