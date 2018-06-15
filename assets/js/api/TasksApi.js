class TasksApi {

    static deleteTask(data, token) {
        return fetch(`/api/tasks/${data.task.id}`, {
                method: 'DELETE',
                headers: {
                        'Authorization': `Token ${token}`,
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }

            ).then((response) =>  {
                return response.status;
            })
    }

     static addTask(data, token) {
        return fetch('/api/tasks/', {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    name: data.name,
                    deadline: data.deadline,
                    todo: data.todo
                })
            }).then((response) =>  {
                return response.json();
            })
    }

    static updateTask(data, token) {
        return fetch(`api/tasks/${data.task}/`, {
                method: 'PUT',
                headers: {
                        'Authorization': `Token ${token}`,
                        'Content-type': 'application/json',
                    },
                body: JSON.stringify(
                    {
                        name: data.name,
                        todo: data.todo
                    })
                },

            ).then((response) =>  {
                return response.json();
            })
    }
}

export default TasksApi;
