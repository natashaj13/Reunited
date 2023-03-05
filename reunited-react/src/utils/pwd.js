//transfered into profile.js, this file can be deleted 

const bcrypt = require('bcryptjs');

export const validateInfo = (name, email, password) => {
    name = name.trim();
    email = email.trim();
    password = password.trim();

    if (name == "" || email == "" || password == "") {
        alert('Fill out all fields');
      } else if (/\d/.test(name)) {
        alert('Enter your full name');
      } else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        alert('Enter a correct email');
      } else if (password.length < 8) {
        alert('Password must be longer than 7 characters');
      } else {
        return (
            {
                name: name, 
                email: email, 
                password: password
            }
        )
      }
}

export const userExists = (email) => {
    let count;
    fetch(`http://localhost:9000/testAPI/users/email/${email}`)
    .then(res => res.text())      
    .then(res => count = res)
    .then(() => count = JSON.parse(count))
    .then(res => console.log(count, count[0].count))
    .then(res => count = parseInt(count[0].count))
    .then(res => console.log(count))
    .then(() => {
        if (count > 0) {
            alert('Email already in use. Try logging in.')
            return false;
        } else {
            return true;
        }
    })
}

export const hashPassword = (ogPassword) => {
    const saltRounds = 10;
        bcrypt.hash(ogPassword, saltRounds).then(hashedPassword => {
            return(hashedPassword);
    })
}