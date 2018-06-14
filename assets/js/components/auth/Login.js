import React from 'react';
import Register from './Register';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/auth';
import { Redirect } from 'react-router';
import { Route } from 'react-router-dom';
import {browserHistory} from 'react-router';
import {Link} from "react-router-dom";

class Login extends React.Component {
    state = {
        username: '',
        password: '',
        token: '',
        isAuthenticated: false
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.mapLoginUser({
            username: this.state.username,
            password: this.state.password
        });
    }

    render() {
        if (this.props.isAuthenticated === true) {
            return <Redirect to='/app' />
        }
        return (
            <div>
                <form>
                    <input
                        onChange={(e) => {
                            const value = e.target.value;
                            this.setState(() => ({
                                username: value
                            }));
                        }} type="text" placeholder="Name" />
                    <input
                        onChange={(e) => {
                            const value = e.target.value;
                            this.setState(() => ({
                                password: value
                            }));
                        }} type="password" placeholder="Password" />
                    <button type="submit" onClick={this.handleSubmit}>Login
                    </button>
                </form>
                Don't have an account? <Link to="/register">Register</Link>

            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authReducer.isAuthenticated
    }
}


const mapDispatchToProps = dispatch => {
    return {
        mapLoginUser: (user) => {
            dispatch(loginUser(user));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
