var request = require('request');
var secret = require('./secret');
var fs = require('fs');
var mkdirp = require('mkdirp');

// first function that gets called, gets the list of contributors
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

// callback function throws error if unable to get data due to passed info
// arses the json file and passes the avatar url to downloadImageByURL
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

//takes the passed url from the callback function and GET the image and downloads it
function downloadImageByURL(url, filepath) {
    request.get(url, function(err, res, body){
        if(err) {
            throw err;
        }
        console.log('Downloading...' + url);
    })
    .pipe(fs.createWriteStream(filepath));
}

//calls the function bytakes repo name and user name and passes it to the function
getRepoContributors(process.argv[2], process.argv[3], callback)
