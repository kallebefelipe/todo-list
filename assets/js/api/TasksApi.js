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

     static addTask(data) {
        return fetch('/api/tasks/', {
                method: 'POST',
                headers: {
                    'Authorization': "Token a454e53304779130a63789f2440f505182679f8d",
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    name: data.name,
                    todo: data.todo.id
                })
            }).then((response) =>  {
                return response.json();
            })
    }

    static updateTask(data) {
        return fetch(`api/tasks/${data.id}/`, {
                method: 'PUT',
                headers: {
                        'Authorization': "Token a454e53304779130a63789f2440f505182679f8d",
                        'Content-type': 'application/json',
                    },
                body: JSON.stringify(data)
                },

            ).then((response) =>  {
                return response.status;
            })
    }
}

export default TasksApi;
