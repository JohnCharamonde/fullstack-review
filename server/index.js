const express = require('express');
let app = express();
const bodyParser = require('body-parser');
const gitHub = require('../helpers/github.js').getReposByUsername;
const save = require('../database/index.js').save;
const retrieveTopForked = require('../database/index.js').retrieveTopForked;

app.use(express.static(__dirname + '/../client/dist'));

app.use(bodyParser.json());

app.post('/repos', function (req, res) {
  gitHub(req.body.login, (err, results) => {
    if(err) {
      res.status(404).send('here is apparently an error');
    } else {
      resultsArr = JSON.parse(results);
      save(resultsArr);
      res.status(200).send('SUCCESS');
    }
  })
});

app.get('/repos', function (req, res) {
  retrieveTopForked((err, results) => {
    res.json(results);
  })
});

let port = 1128;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});

