import { browserHistory } from 'react-router';
import * as types from '../actionTypes';


const todosState = {
    todos: []
}


const todoReducer = (state= todosState, action) => {
  switch(action.type) {
    case types.POPULATE_INITIAL_STATE:
      return {
        todos: action.data
      };
    case types.ADD_TODO_SUCCESS:
      return {
        todos: state.todos.concat(action.todo)
      };
    case types.LOAD_TODO_SUCCESS:
     return {
        todos: action.todos
      };
    case types.DELETE_TODO_SUCCESS: {
      return {
        todos: state.todos.filter((todo) => {
          return todo.id !== action.todo.id
        })
      };
    }
    case types.UPDATE_TODO_SUCCESS: {
      return {
        todos: state.todos.map((todo) => {
          if (todo.id === action.todo.id){
              todo.name = action.todo.name;
          }
          return todo;
        })
      };
    }
    case types.ADD_TASK_SUCCESS: {
      const todos = state.todos.map((todo) => {
        if (todo.id === action.data.todo){
            todo.tasks = todo.tasks.concat(action.data);
        }
        return todo;
      })

      return {
          todos
      };
    }
    case types.UPDATE_TASK_SUCCESS: {
      const todos = state.todos.map((todo) => {
        if (todo.id === action.task.todo){
          todo.tasks = todo.tasks.map((task) => {
            if (task.id === action.task.id){
                task = action.task;
            }
            return task;
          })
        }
        return todo;
      })

      return {
          todos
      };
    }
    case types.DELETE_TASK_SUCCESS: {
      const todos = state.todos.map((todo) => {
        if (todo.id === action.todo_id){
          todo.tasks = todo.tasks.filter((task) => {
            return task.id !== action.task.id
          });
        }
        return todo;
      })

      return {
          todos
      };
    }
    default:
        return state
  }
}


export default todoReducer;

