const request = require('request');
const config = require('../config.js');

let getReposByUsername = (username, callback) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URLc
  let reqURL = 'https://api.github.com/users/' + username + '/repos';
  let options = {
    url: reqURL,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  request.get(options, (error, response, body) =>{
    if(error) {
      console.log(error);
    } else {
      callback(null, response.body);
    }
  })
  // .on('response', function(response) {
  //   console.log(response) // 200
  //   console.log(response.headers['content-type']) // 'image/png'
  // })
}

module.exports.getReposByUsername = getReposByUsername;