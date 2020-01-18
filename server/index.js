const express = require('express');
let app = express();
const bodyParser = require('body-parser');
const gitHub = require('../helpers/github.js').getReposByUsername;
// const save = require(./)
app.use(express.static(__dirname + '/../client/dist'));
// app.use(express.static('../client/dist'));
app.use(bodyParser.json());

app.post('/repos', function (req, res) {
  console.log('this is req.body.login', req.body.login);
  gitHub(req.body.login, (err, results) => {
    resultsArr = JSON.parse(results);
    // console.log(resultsArr);
    var first = resultsArr[0];
    var object = {

    }
  })


  // if(err) {
  //   console.log(err);
  // }
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
});

app.get('/repos', function (req, res) {
  // console.log(req)
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

