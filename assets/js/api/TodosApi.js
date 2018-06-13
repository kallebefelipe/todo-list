class TodosApi {
    static getAllTodos() {
        return fetch('/api/todos',{
                headers: {
                        'Authorization': "Token a454e53304779130a63789f2440f505182679f8d",
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }

            ).then((response) => response.json()
            ).then((responseData) => {
                return responseData;
            });
    }

    static deleteTodo(data) {
        return fetch('/api/todos/'+data.todo.id,{
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

export default TodosApi;
