import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import AddTaskForm from './tasks/AddTaskForm';
import ForgotPassword from './auth/ForgotPassword';
import Login from './auth/Login';
import Register from './auth/Register';
import TodoApp from './TodoApp';


class Jsx extends React.Component {

  PrivateRouter = ({component: ChildComponent, ...rest}) => {
    return <Route {...rest} render={() => {
      if (!this.props.isAuthenticated) {
        return <Redirect to="/login" />;
        }else{
          return <ChildComponent {...this.props} />
        }
      }
    } />
  }

  render() {
    let {PrivateRouter} = this;

    return (
      <BrowserRouter>
        <Switch>
          <PrivateRouter exact path='/' component={TodoApp} />
          <Route exact path='/login' component={Login} />
          <Route path='/add_task' component={AddTaskForm} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/forgot-password' component={ForgotPassword} />
        </Switch>
      </BrowserRouter>
    )
  }

};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authReducer.isAuthenticated
  }
}

export default connect(mapStateToProps)(Jsx);
