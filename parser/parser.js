var parseData = require('./parseData.js');
var fs = require('fs');

var path;

var councilsVoteData = [];

var options = {
        host: 'councils.g0v.tw',
        port: 80,
        path: path,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

var councilsVotePath = '/api/councilors_votes';

var councilorsPath = 'api/councilors/';

var format = 'format=json';

options.path = councilsVotePath + '/?' + format;
console.log(options.path);

parseCouncilsVoteData = function (next) {
    if (next != null) {
        options.path = next;
        parseData.getJSON(options, function (statusCode, result) {
        // console.log(result);
            councilsVoteData.push(result.results);
            // console.log(councilsVoteData);
            console.log(result.next.substring(22));
            parseCouncilsVoteData(result.next.substring(22));
        });
    } else {
        console.log(councilsVoteData);
    }
}

parseCouncilsVoteData(options.path);

