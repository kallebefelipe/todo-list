import {createStore, combineReducers} from 'redux';
import todoReducer from '../reducers/todos';


const setUpStore = () => {
    const store = createStore(
        combineReducers({
            todoReducer
        }),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
    return store;
};

export default setUpStore;
