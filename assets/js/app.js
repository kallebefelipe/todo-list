import 'normalize.css/normalize.css';
import AddTaskForm from './components/tasks/AddTaskForm';
import Login from './components/auth/Login';
import React from 'react';
import ReactDOM from 'react-dom';
import Register from './components/auth/Register';
import setUpStore from './store/configureStore';
import TodoApp from './components/TodoApp';
import { loadTodos } from './actions/todos';
import { Provider } from 'react-redux';
import { Route, Switch, BrowserRouter} from 'react-router-dom';

const store = setUpStore();

const Jsx = () => (
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Login} />
                <Route path='/add_task' component={AddTaskForm} />
                <Route path='/app' component={TodoApp} />
                <Route exact path='/register' component={Register} />
            </Switch>
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(<Jsx />, document.getElementById('app'));
