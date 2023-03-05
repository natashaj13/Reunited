import { createStore, combineReducers } from 'redux';

import { usersReducer } from './searchCard/searchCardSlice.js';
import { searchTermReducer } from './searchBar/searchBarSlice.js';


const reducers = {
  users: usersReducer, 
  searchTerm: searchTermReducer
}

export const store = createStore(combineReducers(reducers));

