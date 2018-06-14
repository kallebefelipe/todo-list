class TodosApi {
    static getAllTodos(token) {
        return fetch('/api/todos', {
                headers: {
                        'Authorization': `Token ${token}`,
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }

            ).then((response) => response.json()
            ).then((responseData) => {
                return responseData;
            });
    }

    static deleteTodo(data, token) {
        return fetch(`/api/todos/${data.id}/`, {
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

    static addTodo(data, token) {
        return fetch('/api/todos/', {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(data)
            }).then((response) =>  {
                return response.json();
            })
    }

    static updateTodo(data, token) {
        return fetch(`api/todos/${data.todo.id}/`, {
                method: 'PUT',
                headers: {
                        'Authorization': `Token ${token}`,
                        'Content-type': 'application/json',
                    },
                body: JSON.stringify(data.todo)
                },

            ).then((response) =>  {
                return response.status;
            })
    }
}

export default TodosApi;
