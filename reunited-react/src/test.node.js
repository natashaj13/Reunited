import React from 'react';

class Node extends React.Component {  
    render() {
        //prints hello from server
        const http = require('http');

        const server = http.createServer((req, res) => {
        res.end("Hello World")
        })

        server.listen(4001, () => {

    })
    }
 }

//gets parts of url
const URL_TO_PARSE = 'https://www.example.com/p/a/t/h?prop1=value1&prop2=value2';

const url = require('url');

const myUrl = new URL(URL_TO_PARSE);

const hostname = myUrl.hostname;
const pathname = myUrl.pathname;
const searchParams = myUrl.searchParams;


//adds argument to end of url
const url = 'https://www.example.com/p/a/t/h?course=node&lesson=http';

const querystring = require('querystring');

const queryToParse = url.split('?')[1];

const parsedQuery = querystring.parse(queryToParse);

parsedQuery.exercise = 'querystring';

const modifiedQueryString = querystring.stringify(parsedQuery);





//accesses db and prints data
const http = require('http');
const fs = require('fs');

// GET request handler
const handleGetRequest = (req, res) => {
 if (req.url === '/users') {
   // Loads the database and searches for data
   makeDatabaseRequest('users', (err, payload) => {
      if (err) {
        res.writeHeader(400);
        res.write("Error retrieving data");
      } else {
        // Process successful request
        res.writeHeader(200, {"Content-Type": "application/json"});  
        res.write(JSON.stringify(payload));
        console.log(payload)
      }
      res.end(); 
   });
 }
}

// Creates server instance
const server = http.createServer((req, res) => {
  const { method } = req;
 
  switch(method) {
    case 'GET':
      return handleGetRequest(req, res);
    default:
      throw new Error(`Unsupported request method: ${method}`);
  }
});

// Starts server listening on specified port
server.listen(4001, () => {
  const { address, port } = server.address();
  console.log(`Server is listening on: http://${address}:${port}`);
});

function makeDatabaseRequest(type, cb) {
  fs.readFile('./database.json', 'utf8', function (err, payload) {
    if (err) {
      cb(err, null); 
    } else {
      cb(null, JSON.parse(payload)[type]);
    }
  });
}