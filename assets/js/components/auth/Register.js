import React from 'react';
import { connect } from 'react-redux';
import { register } from '../../actions/auth';
import { Redirect} from 'react-router';

class Register extends React.Component {
    state = {
        email: '',
        username: '',
        password: '',
        token: '',
        toApp: false,
    }

    handleSubmit = (e) => {
        e.preventDefault();
        fetch('/api/users', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                username: this.state.username,
                password: this.state.password,
            })
        })
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData)
                this.props.dispatch(register({
                    token: responseData.token,
                    email: responseData.email,
                    username: responseData.username,
                }));
                this.setState(() => ({
                    token: responseData.token,
                }));
                if (this.state.token.length > 0){
                    this.setState(()=> ({
                        toApp: true
                    }));
                }

            })
    };


    render() {
        if (this.state.toApp === true) {
            return <Redirect to='/app' />
        }
        return (
            <div>
                <form>
                    <input
                        onChange={(e) => {
                            const value = e.target.value;
                            this.setState(() => ({
                                email: value
                            }));
                        }} type="text" placeholder="email" />
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
                    <button type="submit" onClick={this.handleSubmit}>Register
                    </button>
                </form>
            </div>
        );
    }
};


export default connect()(Register);
