import React, { useEffect, useState } from 'react'; 

import { SearchCard } from '../searchCard/searchCard';
import "./searchResults.css";
import { SearchBar } from '../searchBar/searchBar';



 
export const SearchResults = (props) => {
    const {state, dispatch} = props;

    let newData = [];

    const [ visUsers, setVisUsers ] = useState([]);


 
    async function fetchData() {
      await fetch(`http://localhost:9000/testAPI/users/`)
      .then(res => res.text())      
      .then(res => newData.push(res))
      .then(() => newData = JSON.parse(newData))
      .then(() => setVisUsers(newData))
      .catch(err => err);
    }
 
    

    useEffect(() => {
      fetchData();
    }, [])



    let visibleUsers = getFilteredUsers(visUsers, state.searchTerm);


    return (
      <div>
        <h1>Find a loved one</h1>
        <SearchBar 
          searchTerm = {state.searchTerm}
          dispatch = {dispatch}
        />
        <h2>{`Results ${state.searchTerm ? `for ${state.searchTerm}`: ''}`}</h2>  

          <div className="grid">
              {visibleUsers.map((person) => (
            <SearchCard person={person} key={person.id} />
          ))} 
          </div>
      </div>
    );
  };


  const getFilteredUsers = (users, searchTerm) => {
    return users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }


 