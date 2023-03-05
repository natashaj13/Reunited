var express = require('express');
//var router = express.Router();
var app = express()
var db = require('./queries')


var bodyParser = require('body-parser')
var port = 8000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  }) 
)

app.get('/', (request, response) => {
    response.json("port 8000")
})

app.get('/users', db.getUsers)
app.get('/users/data/:email', db.getUserByEmail)
app.get('/users/email/:email', db.getEmailCount)
app.get('/users/password/:email', db.getPassFromEmail)
app.get('/users/:id', db.getUserByID)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)


app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

// router.get('/', function(req, res) {
//     res.send('App running.');
// });



module.exports = app;