import 'normalize.css/normalize.css';
import Jsx from './routes';
import React from 'react';
import ReactDOM from 'react-dom';
import setUpStore from './store/configureStore';
import { connect } from 'react-redux';
import { loadTodos } from './actions/todos';
import { Provider } from 'react-redux';


const store = setUpStore();


const Template = () => (
  <Provider store={store}>
    <Jsx />
  </Provider>
)


ReactDOM.render(<Template />, document.getElementById('app'));
