import logo from './logo.png';
import './App.css';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router';

import { HomePage } from './components/homePage/homePage';
import { Header } from './components/header/header';
import { SearchResults } from './components/searchResults/searchResults';
import { Footer } from './components/footer/footer';
import { Profile } from './components/profile/profile';
import { Confirm } from './components/confirm/confirm';
import { Login } from './components/profile/login';
import { Settings } from './components/userSettings/settings';

import { store } from './components/store';


class App extends React.Component {
  constructor(props) {
    super(props);
    //add more to state later
    this.state = { apiResponse: "" };
  }

  callAPI() {
    fetch('http://localhost:8000')
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res}))
  }


  render() {
    return (
      <div className="body">      
          <link rel="preconnect" href="https://fonts.googleapis.com"></link>
          <link rel="preconnect" href="https://fonts.gstatic.com"></link>
      {/* deleted crossorigin at end of tag here */}
          <link href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@300&display=swap" rel="stylesheet"></link>
          <link rel="icon" href={logo}></link>
        <Router>
            <Header />
            <Routes>
              {/* can change path name from /component.js to just /componoent */}
                <Route path="/searchResults.js" element={<SearchResults 
                state={store.getState()}
                dispatch={store.dispatch}
                />} />
                <Route path="/profile.js" element={<Profile />} />
                <Route path="/confirm.js" element={<Confirm />} />
                <Route path="/login.js" element={<Login />} />
                <Route path="/settings.js" element={<Settings />} />
                <Route path="/" element={<HomePage />} />
            </Routes>
          <Footer />
        </Router>
      </div>
    ) 
  }

}


export default App;