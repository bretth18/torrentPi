var express = require('express');
var app = express();
var kat = require('kat-api-ce');
var searchQuery;
var google = require('./public/imagecall.js');
var sys = require('util')
var exec = require('child_process').exec;
var title;

app.get('/', function (req, res) {
	res.sendFile('index.html', {root: './public' })
});
app.get('/search/:torrentID', function(req, res) {
searchQuery = req.params.torrentID;

kat.search({
    query: searchQuery,
    sort_by: 'seeders'
}).then(function (response) {
	title = response.results[0].title;
	var magnet = response.results[0].magnet;
	console.log('Got the API results.')
	var easy = '"';
	exec("peerflix " + easy + magnet + easy + " --vlc ",function(error, stdout, stderr){
	console.log(error);
	console.log(stdout);
	console.log(stderr);
});
}).catch(function (error) {
console.log('an error occured');
});
var body = "";
//use imagecall to find movie poster
google.search(searchQuery + ' poster', 10, function(results) {
		console.log('Image selected from google.');
		body+='<img width=50% height="100%" src="'+results[7]+'"></img>';
         	res.send('<h5>Movie is being sent to VLC. Enjoy!</h5>'+body);
});
});
var server = app.listen(1337, function () {
  console.log('torrentPi server listening at http://localhost:1337');
});
