var request = require('request');
var secret = require('./secret');
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');
var avaURL = ''

function getRepoContributors(repoOwner, repoName, callback) {
    var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
      headers: {
     'User-Agent': 'DavidHaynesHasGitHub',
     'Authorization' : secret
      }
    };

  request(options, function(err, res, body) {
    callback(err, body);
      var avaURL = JSON.parse(body)
      for (element of avaURL)
      console.log(element['avatar_url'])
  });
}


getRepoContributors("jquery", "jquery", function(err, result){

});
