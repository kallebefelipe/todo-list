import 'normalize.css/normalize.css';
import React from 'react';
import ReactDOM from 'react-dom';
import setUpStore from './store/configureStore';
import { loadTodos } from './actions/todos';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import Jsx from './components/routers';


const store = setUpStore();

const Template = () => (
  <Provider store={store}>
    <Jsx />
  </Provider>
)

ReactDOM.render(<Template />, document.getElementById('app'));
