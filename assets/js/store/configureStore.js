import {createStore, combineReducers, applyMiddleware } from 'redux';
import todoReducer from '../reducers/todos';
import authReducer from '../reducers/auth';
import userReducer from '../reducers/user';
import thunkMiddleware from 'redux-thunk';


const setUpStore = () => {
  const store = createStore(
    combineReducers({
      todoReducer,
      authReducer,
      userReducer,
    }),
    applyMiddleware(thunkMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  return store;
};


export default setUpStore;
