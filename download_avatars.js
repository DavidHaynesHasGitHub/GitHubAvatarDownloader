var request = require('request');
var secret = require('./secret');
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
    var options ={
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
      headers: {
     'User-Agent': 'request',
     'Authorization' : secret
   }
    };
  request(options, function(err, res, body) {
    cb(err, body);
  });
}
getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  
  var avaURL = JSON.parse(result)

  console.log(avaURL[0]['avatar_url'])

  for (let element of avaURL) {
    request.get(element['avatar_url'])               // Note 1
           .on('error', function (err) {                                   // Note 2
             throw err;
           })
           .on('response', function (response) {                           // Note 3
             console.log('Response Status Code: ', response.statusCode);
           })
           .pipe(fs.createWriteStream("./avatars/" + element["login"] + '.png'))  }
});
