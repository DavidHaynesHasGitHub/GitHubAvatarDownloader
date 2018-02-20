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

  });
}
getRepoContributors("jquery", "jquery", function(err, result){

});

function downloadImageByURL(url, filepath) {
    request.get(url, function(err, res, body){
        if(err) {
            throw err;
        }
        console.log("Downloading..." + url);
    })
    .pipe(fs.createWriteStream(filepath));
}

downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")
