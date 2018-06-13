import taskApi from '../api/TasksApi';

export function deleteTaskSuccess(task) {
    return {type: 'DELETE_TASK_SUCCESS', task};
}

const populateInitialState = (data) => ({
    type: 'POPULATE_INITIAL_STATE',
    data: data
});

const addTask = (task) => ({
    type: 'ADD_TASK',
    task
});


function deleteTask (task) {
    return function(dispatch){
        return taskApi.deleteTask(task).then(() => {
            console.log(`Deleted ${task.id}`)
            dispatch(deleteTaskSuccess(task))
            return;
        })
    }
};

export { populateInitialState, addTask, deleteTask };
