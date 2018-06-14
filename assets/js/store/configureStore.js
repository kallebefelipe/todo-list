import {createStore, combineReducers, applyMiddleware } from 'redux';
import todoReducer from '../reducers/todos';
import authReducer from '../reducers/auth';
import thunkMiddleware from 'redux-thunk';


const setUpStore = () => {
    const store = createStore(
        combineReducers({
            todoReducer,
            authReducer
        }),
        applyMiddleware(thunkMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
    return store;
};

export default setUpStore;
