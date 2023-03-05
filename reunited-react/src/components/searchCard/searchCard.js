import React from "react";
import { useState } from "react";
 
import placeholder from "../../profileFiller.png";
import "./searchCard.css";
import { Confirm } from "../confirm/confirm";
 
//import { loadData } from "./searchCardSlice";
 
 
export const SearchCard = ({ person }) => {
const [shown, setShown] = useState(false);

const openForm = () => {
  setShown(true);
}


window.onclick = function (event) {
  if (event.target.className === "modal") {
    setShown(false);
  } else if (event.target.className === "modalSent") {
    event.target.style.display = "none";
  } 
};

 
 
 return (
   <div key={person.id} className="card">
     <img src={person.profilelink} alt="profile picture"/> 
     <h1>{person.name}</h1>
     <p>Birthday: {person.birthday}</p>
     <p>{person.email}</p>

     <button id="open" onClick={openForm}>Contact</button>

    {shown &&
      <Confirm person={person} key={person.id} shown={true}/>
    }
   </div>
 );
};
