const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', {useNewUrlParser: true});

//new code
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('HELLLLLLLOOOOOOOOO!!!!!!!!!!!!!!!!!!!!')
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

let save = (repos) => {
  repos.forEach(repo => {
    let tempRepo = new Repo({
      id: repo.id,
      name: repo.name,
      owner: repo.owner,
      url: repo.url,
      forks: repo.forks
    })
    tempRepo.save((err, tempRepo) => {
      if(err) return console.log(err);
      console.log('created a document instance!')
    })
  })
}

module.exports.save = save;