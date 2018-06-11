import {createStore} from 'redux';
import todoReducer from '../reducers/todos';


const setUpStore = () => {
    const store = createStore(todoReducer);
    return store;
};

export default setUpStore;
