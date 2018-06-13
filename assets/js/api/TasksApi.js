class TasksApi {

    static deleteTask(data) {
        return fetch('/api/tasks/'+data.task.id, {
                method: 'DELETE',
                headers: {
                        'Authorization': "Token a454e53304779130a63789f2440f505182679f8d",
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }

            ).then((response) =>  {
                return response.status;
            })
    }
}

export default TasksApi;
