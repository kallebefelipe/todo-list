import taskApi from '../api/TasksApi';

export function addTaskSuccess(data) {
    return {type: 'ADD_TASK_SUCCESS', data};
}

export function updateTaskSuccess(data) {
    return {
        type: 'UPDATE_TASK_SUCCESS',
        task: data
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
    console.log(task)
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


const updateTask = (task, token) => {
    return (dispatch) => {
        return taskApi.updateTask(task, token).then((task) => {
            dispatch(updateTaskSuccess(task));
        })
    }
};

export { addTask, deleteTask, updateTask };
