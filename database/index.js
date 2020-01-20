const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', { useNewUrlParser: true });


let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('openUri', function () { console.log('database open') });

let repoSchema = mongoose.Schema({
  id: Number,
  name: String,
  owner: String,
  url: String,
  forks: Number
});


let Repo = mongoose.model('Repo', repoSchema);

let save = (repos) => {
  for (let i = 0; i < repos.length; i++) {
    Repo.find({ id: repos[i].id }, (err, result) => {
      if (err) {
        console.log('err')
      } else {
        if (result.length === 0) {
          let temp = new Repo({
            id: repos[i].id,
            name: repos[i].name,
            owner: repos[i].owner.login,
            url: repos[i].url,
            forks: repos[i].forks
          })
          temp.save((err, tempRepo) => {
            if (err) return console.log(err);
            console.log('created a document instance!');
          })
        } else {
          console.log('You just tried to add a duplicate!');
        }
      }
    })
  }
}

let retrieveTopForked = (callback) => {
  Repo.find({}, (err, results) => {
    if(err) console.log(err);
    let resultsArr = [];
    for(let i = 0; i < results.length; i++) {
      resultsArr.push(results[i]._doc);
    }
    resultsArr.sort((a, b) => { return b.forks - a.forks; });
    callback(null, resultsArr.slice(0, 25))
  });

}

module.exports = {
  save: save,
  retrieveTopForked: retrieveTopForked
};