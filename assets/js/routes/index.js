import AddTaskForm from '../containers/tasks/AddTask';
import ForgotPassword from '../containers/auth/ForgotPassword';
import Login from '../containers/auth/Login';
import React from 'react';
import Register from '../containers/auth/Register';
import TodoApp from '../containers/TodoApp';
import { connect } from 'react-redux';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';


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
