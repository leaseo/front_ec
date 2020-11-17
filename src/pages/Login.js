import React, { Component } from 'react';
import '../css/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import md5 from 'md5';
import Cookies from 'universal-cookie';

const baseUrl = "http://localhost:3000/api/v1/";
const cookies = new Cookies();


class Login extends Component {
    state = {
        form: {
            email: '',
            password: ''
        }
    }

    handleChange = async e => {
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
    }

    componentDidMount() {
        if(cookies.get('user')) {
            window.location.href = "./gridData";
        }
    }

    login = async() => {
        let url = baseUrl + 'auth/login';
        await axios(url, { 
            method: 'POST', 
            headers: { 'content-type': 'application/json' },
            data:{
                user: this.state.form.email,
                password: md5(this.state.form.password)
            }
        }).then(response => {
            return response.data;
        }).then(response => {
            if(response) {
                cookies.set('user', response.user, {path: '/'});
                cookies.set('token', response.token, {path: '/'});
                window.location.href = "./gridData";
            }
        }).catch(err => {
            console.log(err);
            alert('Por favor verifique el usuario y/o password');
        })
    }

    render() {
        return (
            <div className="containerPrincipal">
                <div className="containerSecundario">
                    <div className="form-group">
                        <label>Email: </label>
                        <br />
                        <input
                            type="text"
                            className="form-control"
                            name="email"
                            onChange={this.handleChange}
                        ></input>
                        <br />
                        <label>Contraseña: </label>
                        <br />
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            onChange={this.handleChange}
                        ></input>
                        <br />
                        <button className="btn btn-primary" onClick={() => this.login()}>Login</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;