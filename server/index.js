const express = require('express');
let app = express();
const bodyParser = require('body-parser');
const gitHub = require('../helpers/github.js').getReposByUsername;
const save = require('../database/index.js').save;
const retrieveTopForked = require('../database/index.js').retrieveTopForked;

app.use(express.static(__dirname + '/../client/dist'));

app.use(bodyParser.json());


// TODO - your code here!
// This route should take the github username provided
// and get the repo information from the github API, then
// save the repo information in the database
app.post('/repos', function (req, res) {
  gitHub(req.body.login, (err, results) => {
    resultsArr = JSON.parse(results);
    save(resultsArr);
  })
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  retrieveTopForked((err, results) => {
    res.json(results);
    // console.log('this is results inside my server app.get', results);
  })
});

let port = 1128;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});

