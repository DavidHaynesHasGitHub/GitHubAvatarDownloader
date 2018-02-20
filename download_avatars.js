var request = require('request');
var secret = require('./secret');
var fs = require('fs');
var mkdirp = require('mkdirp');

function getRepoContributors(repoOwner, repoName, callback) {
    var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
      headers: {
     'User-Agent': 'DavidHaynesHasGitHub',
     'Authorization' : 'token ' + secret.GITHUB_TOKEN
      }
    };

  request(options, function (err, res, body) {
    if (err){
      throw err
    }
    var avaURL = JSON.parse(body)
         callback(err, res, body);
     });
}

function downloadImageByURL(url, filepath) {
    request.get(url, function(err, res, body){
        if(err) {
            throw err;
        }
        console.log('Downloading...' + url);
    })
    .pipe(fs.createWriteStream(filepath));
}


var callback = function (error, response, body) {
    if (!error && response.statusCode == 200) {
        mkdirp('./avatars', function (err) {
            console.log('Directory created');
        });
        var filepath;
        var info = JSON.parse(body);
        for (let element of info) {
            filepath = './avatars/' + element['login'] + '.png';
            downloadImageByURL(element['avatar_url'], filepath)
        }
    } else {
        console.log('ya dun fucked it good')
        throw err;
    }
}
var repoOwner = 'jQuery'
var repoName = 'jQuery'
getRepoContributors(repoOwner, repoName, callback)
