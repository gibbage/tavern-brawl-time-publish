var AWS = require('aws-sdk');
var Promise = require('promise');
var BrawlScheduler = require('./brawl-scheduler');

function getConfig() {
  var promise = new Promise(function (resolve, reject) {
    var s3 = new AWS.S3({apiVersion: '2006-03-01'});
    s3.getObject({
        Bucket: 'tavern-brawl-time-config',
        Key: 'config.json'
    }, function (err, data) {
        if (err) {
            reject(err);
        } else {
            resolve(JSON.parse(data.Body.toString('utf8')));
        }
    });
  });
  return promise;
}

function getCurrentBrawlData() {
  var promise = new Promise(function (resolve, reject) {
    var s3 = new AWS.S3({apiVersion: '2006-03-01'});
    s3.getObject({
        Bucket: 'tavern-brawl-time',
        Key: 'current.json'
    }, function (err, data) {
        if (err) {
            reject(err);
        } else {
            resolve(JSON.parse(data.Body.toString('utf8')));
        }
    });
  });
  return promise;
}


function generatePin(isActive, timestamp, currentBrawlData) {
  var id = isActive ?
    'brawl-end-' + currentBrawlData.id :
    'brawl-start-' + currentBrawlData.id + 1;
  var title = isActive ? "Tavern Brawl Ends" : "It's Tavern Brawl Time";

  var pin = {
    "id": id,
    "time": timestamp.toISOString(),
    "layout": {
      "type": "genericPin",
      "title": title,
      "tinyIcon": "system://images/NOTIFICATION_FLAG"
    },
    "actions": [{
      "title": "More Info",
      "type": "openWatchApp"
    }]
  }

  // I might not have updated this to the latest yest
  if (isActive && currentBrawlData.name) {
    pin.layout.subtitle = currentBrawlData.name;
  }

  return pin;
}

var https = require('https');
function publishPin(timelineApiKey, region, pin) {
  var promise = new Promise(function (resolve, reject) {

    var putData = JSON.stringify(pin);

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
          console.log('STATUS: ' + response.statusCode);
          console.log('RESPONSE: : ' + rawResponse);
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

exports.handler = function (event, context) {
  Promise.all([getConfig(), getCurrentBrawlData()])
    .then(function (resolvedValues) {
      var config = resolvedValues[0];
      var brawlData = resolvedValues[1];
      console.log('Keytime:', config.timelineApiKey);
      console.log('Brawl Data', brawlData);

      // loop through each region and create/update pin
      console.log('BS', BrawlScheduler.REGIONS);
      var allPinRequests = [];
      BrawlScheduler.REGIONS.forEach(function (region) {
        console.log('Processing region: ' + region);
        var scheduler = new BrawlScheduler(region);
        var pin = generatePin(
          scheduler.brawlStillActive(), scheduler.nextEvent(), brawlData);

        // make HTTP POST with as body pin
        console.log('Pin for ' + region, pin);
        allPinRequests.push(
            publishPin(config.timelineApiKey, region, pin)
        );
      });
      return Promise.all(allPinRequests);
    })
    .then(function () {
      console.log('dun');
      context.done(null, 'Job\'s dun!');
    })
    .catch(function (err) {
      console.log('crap', err);
    });
};
