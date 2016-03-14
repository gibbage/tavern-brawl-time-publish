var https = require('https');
var Promise = require('promise');

function publishPin(timelineApiKey, region, pin) {
  var promise = new Promise(function (resolve, reject) {

    var putData = JSON.stringify(pin);

    console.log('Publish pin for "' + region + '":', putData);

    var options = {
      hostname: 'timeline-api.getpebble.com',
      port: 443,
      path: '/v1/shared/pins/' + pin.id,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=UTF8',
        'Content-Length': putData.length,
        'X-API-Key': timelineApiKey,
        'X-Pin-Topics': region
      }
    };

    var request = https.request(options, function (response) {
      var rawResponse = '';
      response.setEncoding('utf8');
      response.on('data', function (chunk) {
        rawResponse += chunk;
      });
      response.on('end', function () {
        if (response.statusCode === 200) {
          console.log('Publishing pin for "' + region + '": ' +
            response.statusCode + ' ' + rawResponse);
          resolve();
        } else {
          var error = new Error('Error updating pin "' + pin.id + '"' +
            ' for region "' + region + '". Status Code: ' + response.statusCode +
            ', message: ' + rawResponse);
          reject(error);
        }
      });
    });
    request.write(putData);
    request.end();
  });
  return promise;
}

module.exports = publishPin;
