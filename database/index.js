const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', { useNewUrlParser: true });


let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () { console.log('database open') });

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
    let temp = new Repo({
      id: repos[i].id,
      name: repos[i].name,
      owner: repos[i].owner.login,
      url: repos[i].url,
      forks: repos[i].forks
    })
    temp.save((err, tempRepo) => {
      if (err) return console.log(err);
      console.log('created a document instance!')
    })
  }

  // tempRepo.save((err, tempRepo) => {
  //   if(err) return console.log(err);
  //   console.log('created a document instance!')
  // })
  // })
}

module.exports.save = save;