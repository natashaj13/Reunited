import React, { useState } from "react";
import { send } from 'emailjs-com';

import "./confirm.css";

export const Confirm = ({ person }) => {
    const [toSend, setToSend] = useState({
     from_name: '',
     message: '',
     id: person.id,
   });


   const onSubmit = (e) => {
     e.preventDefault();
     send(
       'service_v88m80l',
       'template_f3t92sn',
       toSend,
       'ma0lbaNo9RjBqCIPl'
     )
     .then(res => {
        console.log('Success!', res.status, res.text);
        document.getElementById("message").value = "";
        document.getElementById("email").value = "";

        //this makes it so you can not reopen the form after submit
        document.getElementById("modalOne").style.display = "none";
 
        document.getElementById("sent").style.display="block";
     })
     .catch(err => {
       document.getElementById("failed").style.display="block";
       console.log('Failed to send', err);
     })
   }
   
    const handleChange = e => {
      setToSend({...toSend, [e.target.name]: e.target.value});
    }
   
   return (
     <div key={person.id}>

        <div id="modalOne" className="modal">
          <div className="modal-content">
            <div className="contact-form">
              <form onSubmit={onSubmit}>
                <h1>Contact {person.name}</h1>

                <label htmlFor="email"><b>Email</b></label>
                <input id="email" type="text" placeholder="Your email" name="from_name" value={toSend.from_name} onChange={handleChange} required />

                <label htmlFor="message"><b>Message</b></label>
                <textarea id="message" name="message" value={toSend.message} onChange={handleChange} rows="4" cols="20"/>

                <button type="submit" className="btn" onClick={onSubmit}>Send</button>
                {/* <button className="cancel" onClick={closeForm}>Close</button> */}
              </form>
            </div>
          </div>
        </div>

        <div id="sent" className="modalSent" >
          <h2>Message Sent!</h2>
          <p>{person.name} will have the option to respond to your message.</p>
        </div>

        <div id="failed" className="modalSent">
          <h2>Failed to send</h2>
          <p>Try again</p>
        </div>

     </div>
   );
  };
