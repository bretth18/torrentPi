//imagecall.js 
//bretth18 2016

var request = require('request');

var search = function (query, length, callback) {
	var search = query;
	search = search.replace(/ /g, "+");

	var options = {
		url: 'https://www.google.com/search?q='+search+'&biw=1920&bih=955&source=lnms&tbm=isch&sa=X&ved=0ahUKEwiew-uLvNzJAhUKOj4KHalvAlcQ_AUIBigB',
		headers: {
			'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.80 Safari/537.36'
		}
	};
	request(options,
	function(error, response, body) {
		parse(body, length, function(results) {
			callback(results);
		});
	});
}
//parse out url
function parse(body, length, callback) {
	var last = 0;
	var count = 0;
	var results = [];
	do {
		var uristart = body.indexOf('href="/imgres?', last)+'href='.length;
		var uriend   = body.indexOf('"', uristart+"href='".length)+1;
		var imageURLstart = uristart+'/imgres?imgurl='.length+1;
		var imageURLend   = body.indexOf('&amp;', imageURLstart);
		var URL = body.substring(imageURLstart, imageURLend);
		if(uristart != -1 && imageURLstart != -1) {
			results.push(URL);
			last = uristart;
		} else {
			break;
		}
		count++;
	} while(uristart != -1 && count < length);
	callback(results);
}
//func for random
function random(query, length, callback) {
	var high = length;
	var low  = 0;
	var rand = Math.floor(Math.random()*(high-low)+low);
	search(query, length, function(results) {
		callback(results[rand]);
	});
}


exports.search = search;
exports.random = random;
