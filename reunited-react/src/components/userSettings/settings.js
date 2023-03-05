import React from 'react';
import { Navigate } from 'react-router';
import storage from '../../utils/firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage';


import "./settings.css";

const bcrypt = require('bcryptjs');

export class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        id: localStorage.getItem('userID'),
        fullName: '',
        email: '',
        birthday: '',
        passcode: '',
        file: '',
        imageURL: '',
        shown: false, 
        redirect: false,
        } 

        //this.getInitialInfo = this.getInitialInfo.bind(this);
        this.validateInfo = this.validateInfo.bind(this);
        this.hashPassword = this.hashPassword.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.deleteAccount = this.deleteAccount.bind(this);
        this.toggleOff = this.toggleOff.bind(this);
        this.toggleOn = this.toggleOn.bind(this);
        this.uploadTaskPromise = this.uploadTaskPromise.bind(this);
    }

    // async getInitialInfo() {
    //     let data;
    //     await fetch(`http://localhost:9000/testAPI/users/${this.state.id}`)
    //     .then(res => res.text())
    //     .then(res => data = JSON.parse(res))
    //     .then(() => this.setState({ fullName: data[0].name, email: data[0].email, birthday: data[0].birthday } ))
    //     .catch(err => err);
    // }


    validateInfo(name, email, birthday, password, file) {
        name = name.trim();
        email = email.trim();
        birthday = birthday.trim();
    
        if (name == "" || email == "" || password == "" || birthday == "" || file == "") {
            alert('Fill out all fields');
          } else if (/\d/.test(name)) {
            alert('Enter your full name');
          } else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            alert('Enter a valid email');
          } else if (password.length < 8) {
            alert('Password must be longer than 7 characters');
          } else if (!/^((0|1)\d{1})-((0|1|2)\d{1})-((19|20)\d{2})/.test(birthday)) {
            alert('Birthday should be in MM-DD-YYYY format');
          } else {
            return true;
        }
    } 

    async hashPassword(ogPassword) {
        let hash;
        const saltRounds = 10;
        return bcrypt.hash(ogPassword, saltRounds).then(res => {
            hash = res;
            return hash;
        }).catch(err => err);
    }

    async uploadTaskPromise() {
        const fileName = this.state.file.name;
        const fullFile = this.state.file;
        return new Promise(function(resolve, reject) {
            const storageRef = ref(storage, `/files/${fileName}`)
            const uploadTask = uploadBytesResumable(storageRef, fullFile);
          uploadTask.on('state_changed',
            function(snapshot) {
            },
            function error(err) {
              console.log('error', err)
              reject()
            },
            function complete() {
              getDownloadURL(uploadTask.snapshot.ref).then(function(downloadURL) {
                resolve(downloadURL)
              })
            }
          )
        })
    }

    //when add get initial info, make async
    async handleFormSubmit(e) {
        e.preventDefault();

        if(this.validateInfo(this.state.fullName, this.state.email, this.state.birthday, this.state.passcode, this.state.file)) {
            let tempPass = this.state.passcode;
            const storageUrl = await this.uploadTaskPromise();
            this.setState({imageURL: storageUrl});
            
            this.hashPassword(tempPass).then(res => {
                tempPass = res;
                this.setState({ passcode: tempPass });
            }).then(() => {   
                fetch(`http://localhost:9000/testAPI/users/${this.state.id}`, {
                    method: "PUT", 
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        "name": this.state.fullName, 
                        "email": this.state.email,
                        "password": this.state.passcode,
                        "birthday": this.state.birthday, 
                        "profilelink": this.state.imageURL
                    })
                }).then((res) => {
                    if (res.status === 200) {
                        this.setState({ fullName: "", email: "", passcode: "", birthday: "", file: "", imageURL: "" })
        
                        //clears input fields after submit
                        document.getElementById('fullName').value="";
                        document.getElementById('birthday').value="";
                        document.getElementById('email').value="";
                        document.getElementById('passcode').value="";
                        document.getElementById('profile').value="";
            
                        alert("Successfully updated!");

                        //redirect
                        this.setState({ redirect: true });
                    } else {
                        alert("Error changing information, try again");
                    }
                })
            })
        }
    }


    deleteAccount() {
        fetch(`http://localhost:9000/testAPI/users/${this.state.id}`, {
            method: "DELETE", 
            headers: {"Content-Type": "application/json"},
        }).then(() =>
            localStorage.clear()
        ).then(() => {
            this.setState({ redirect: true })
        })
        .catch(err => err)
    }


    toggleOff() {
        this.setState({shown: false})
    }
    toggleOn() {
        this.setState({shown: true})
    }


    render() {
        return (
            <div>
                <h1>Update Your Information</h1>
                <form action="#" id="form">
                <label>Profile Photo</label>
                <input type="file" id="profile" name="profile" accept="image/*"
                    onChange={e => this.setState({file: e.target.files[0]})}                
                    required
                />   
                <label>Full Name</label>
                <input type="text" id="fullName" name="fullName" placeholder="First and last name"
                    value={this.state.fullName}
                    onChange={e => this.setState({ fullName: e.target.value })}
                />
                <label>Birthday</label>
                <input type="text" id="birthday" name="birthday" placeholder="MM-DD-YYYY"
                    value={this.state.birthday}
                    onChange={e => this.setState({ birthday: e.target.value })}                    required
                />
                <label>Email</label>
                <input type="email" id="email" name="email" placeholder="Your email"
                    value={this.state.email}
                    onChange={e => this.setState({ email: e.target.value })}
                />
                <label>Password</label>
                <input type="password" id="passcode" name="passcode"
                    value={this.state.passcode}
                    onChange={e => this.setState({ passcode: e.target.value })}
                    required
                />
                <input type="submit" onClick={e => this.handleFormSubmit(e)} value="Save Changes" />
                </form >

                <h1 id="deleteLabel">Delete Account</h1>
                <button id="delete" onClick={this.toggleOn}>Delete</button>
                
                {this.state.shown &&
                    <div className="deleteConfirm">
                        <h2>Are you sure? All information will be lost.</h2>
                        <button id="yes" onClick={this.deleteAccount}>Yes</button>
                        <button id="no" onClick={this.toggleOff}>No</button>
                    </div>
                }

                {this.state.redirect &&
                    <Navigate to="/"></Navigate>
                }

            </div>
        )
    }
}
