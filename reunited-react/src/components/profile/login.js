import React from 'react';
import { NavLink, Navigate } from 'react-router-dom';

import "./profile.css";

const bcrypt = require('bcryptjs');


export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        email: '',
        password: '',
        isUser: false,
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.checkLogin = this.checkLogin.bind(this);
        this.validateInfo = this.validateInfo.bind(this);
        this.storeID = this.storeID.bind(this);
        this.logout = this.logout.bind(this);
    }


    validateInfo(email, password) {
        email = email.trim();
    
        if (email == "" || password == "") {
            alert('Fill out all fields');
          } else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            alert('Enter a valid email');
          } else {
            return true;
        }
    } 


    async handleFormSubmit(e) {
        e.preventDefault();

        await this.checkLogin(e)

        if(localStorage.getItem('userID') !== null) {
            alert('logged inn a hut!!!!', localStorage.getItem('userID'));
            //redirect to home page, set login page to update, change text in header
        } else {
            alert('incorrect login')
        }
    }


    async checkLogin(e) {
        e.preventDefault();
    
        let hashedPwd;
        let isLoggedIn = false;
    
        if(this.validateInfo(this.state.email, this.state.password)) {
        
            await fetch(`http://localhost:9000/testAPI/users/password/${this.state.email}`)
            .then(res => res.text())
            .then(res => hashedPwd = res)
            .then(() => hashedPwd = JSON.parse(hashedPwd))
            .then(async () => {
                if (hashedPwd.length === 0) {
                    alert('Email not found. Try creating a profile.')
                } else {
                    hashedPwd = hashedPwd[0].password;
                    await bcrypt.compare(this.state.password, hashedPwd).then(res => {
                        isLoggedIn = res;
                        if (isLoggedIn) {
                            this.setState({ isUser: true });
                        }
                    })
                }
            })
            .catch(err => err);
        
            if(isLoggedIn) {
                await this.storeID(this.state.email);
            }
        }
  
    }


    async storeID(username) {
        let data;
        let id;
    
        await fetch(`http://localhost:9000/testAPI/users/data/${username}`)
        .then(res => res.text())
        .then(res => data = res)
        .then(() => data = JSON.parse(data))
        .catch(err => err)
    
        id = data[0].id;
    
        localStorage.setItem('userID', id);
    }


    logout(e) {
        e.preventDefault();
        this.setState({ email: "", password: "", isUser: false });
        localStorage.clear();
    }


    componentDidMount() {
        if (localStorage.getItem('userID') !== null) {
            this.setState({ isUser: true });
        }
    }


    render() {
        return (
            <div>
                <h1>Login</h1>
                <form action="#" id="form">
                    <label>Email</label>
                    <input type="text" id="email" name="email" placeholder="Your email"
                        value={this.state.email}
                        onChange={e => this.setState({ email: e.target.value })}
                        required
                    />
                    <label>Password</label>
                    <input type="password" id="password" name="password"
                        value={this.state.password}
                        onChange={e => this.setState({ password: e.target.value })}
                        required
                    />
                    <input type="submit" onClick={e => this.handleFormSubmit(e)} value="Submit" />
                </form >

                <p><NavLink to="../profile.js" style={{color: "white"}}>Don't have an account? Create a profile.</NavLink></p>


                {this.state.isUser &&
                    //     <h2>Logout {localStorage.getItem('userID')}</h2>
                    //     <button id="logout" onClick={e => this.logout(e)}>Logout</button>
                    <Navigate to="/"></Navigate>
                }

            
            </div>
        )
    }
}