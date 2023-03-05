import React from 'react';
import { NavLink } from 'react-router-dom';
 
import "./homePage.css";

export class HomePage extends React.Component {
    render() {
        return (
            <div className="homePage">
                <h1 className="desc">Reconnect with a loved one</h1>
                <NavLink to="../searchResults.js"><button className="searchButton">SEARCH NOW</button></NavLink>

                {!localStorage.getItem('userID') &&
                    <h4>OR <NavLink to="/profile.js" className="create">create a profile</NavLink></h4>
                }

                <article>
                    <h3>About Reunited</h3>
                    <p>Reunited was created to reunite families that may have gotten separated during the war. blah blah blah</p>
                </article>             
            </div>
        )
    }
}