const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

//new code
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  let repoSchema = mongoose.Schema({
    id: Number,
    name: String,
    owner: {
      login: String
    },
    url: String,
    forks: Number
  });
});
//end new code

let Repo = mongoose.model('Repo', repoSchema);

let save = (/* TODO */) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
}

module.exports.save = save;