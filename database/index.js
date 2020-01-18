const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', {useNewUrlParser: true});


let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() { console.log('database open')});

let repoSchema = mongoose.Schema({
  id: Number,
  name: String,
  owner: String,
  url: String,
  forks: Number
});


let Repo = mongoose.model('Repo', repoSchema);

let save = (repos) => {
  for(let i = 0; i < repos.length; i++) {
    console.log(i)
  }
  // repos.forEach(repo => {
  //   let tempRepo = new Repo({
  //     id: repo.id,
  //     name: repo.name,
  //     owner: repo.owner,
  //     url: repo.url,
  //     forks: repo.forks
  //   })
    // console.log('THIS IS A TEMP REPO', tempRepo)
    // tempRepo.save((err, tempRepo) => {
    //   if(err) return console.log(err);
    //   console.log('created a document instance!')
    // })
  // })
}

module.exports.save = save;