import React from 'react';
import GoogleLogin, { GoogleLogout } from 'react-google-login';

import { refreshTokenSetup } from '../../utils/refreshToken';
import "./sign.css";

const clientId = 'id here';
let isLoggedIn = false;

export class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
        }
    }

    render() {
        const onSuccess = (res) => {
            let user = res.profileObj.name;
            console.log('currentUser: ', res.profileObj);

            this.setState({user: user})

            refreshTokenSetup(res);
            isLoggedIn = true;
        };

        const logoutSuccess = () => {
            isLoggedIn = false;
        }
 

        if (isLoggedIn) {
            return (
                <div className="sign">
                    <h3>Welcome, {this.state.user}</h3>
                   <GoogleLogout 
                    clientId={clientId}
                    buttonText="Logout"
                    className="signButton"
                    onSuccess={logoutSuccess}
                />
                </div>
            )
        } else {
            return (
                <div className="sign">
                    <h3>Log in or create an account</h3>
                    <GoogleLogin 
                        clientId={clientId}
                        buttonText="Sign in with Google"
                        onSuccess={onSuccess}
                        cookiePolicy={"single_host_origin"}
                        isSignedIn={true}
                        className="signButton"
                    />
                </div>
            )
        }
    }
}