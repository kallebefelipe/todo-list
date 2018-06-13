import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import Register from './Register';
import { Route } from 'react-router-dom';
import {browserHistory} from 'react-router';


class Login extends React.Component {
    state = {
        username: '',
        password: '',
        token: ''
    }

    handleSubmit = (e) => {
        console.log('foi')
        e.preventDefault();
        fetch('/api/users', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                email: 'novo@gmail.com',
                username: this.state.username,
                password: this.state.password
            })
        })
            .then((response) => response.json())
            .then((responseData) => {
                this.setState(() => ({
                    token: responseData.token
                }));

            })
        var teste = this.state
    };

    handleClick = () => {
        debbuger;
        browserHistory.push('/register');
    };


    render() {
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
                    <button type="submit" onClick={this.handleClick}>Register
                    </button>
                </form>
            </div>
        );
    }
};


export default connect()(Login);
