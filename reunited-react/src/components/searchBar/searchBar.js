import React from 'react';

import './searchBar.css';

import { setSearchTerm } from './searchBarSlice';


 
export const SearchBar = props => {
  //previously had searchterm as props too
    const { dispatch } = props;

    const onTermChange = e => {
      e.preventDefault();
      const userInput = e.target.value;
      dispatch(setSearchTerm(userInput));
    };

    // const onClearSearch = () => {
    //   dispatch(clearSearchTerm());
    // };

    return (
      <div className="SearchBar">
        <form className="search-form">
          <input onChange={onTermChange} type="text" className="search" placeholder="Enter a name"/>
          <button type="submit" className="SearchButton">SEARCH</button>
        </form>
        </div>
      );

}





