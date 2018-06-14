import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import TodoApp from './components/TodoApp';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { Provider } from 'react-redux';
import setUpStore from './store/configureStore';
import { Route, Switch, BrowserRouter} from 'react-router-dom';
import { loadTodos } from './actions/todos';
const store = setUpStore();

const Jsx = () => (
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Login} />
                <Route path='/app' component={TodoApp} />
                <Route exact path='/register' component={Register} />
            </Switch>
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(<Jsx />, document.getElementById('app'));
