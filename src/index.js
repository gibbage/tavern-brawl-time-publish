var AWS = require('aws-sdk');
var Promise = require('promise');
var BrawlScheduler = require('./brawl-scheduler');
var generatePin = require('./pin-generator');
var publishPin = require('./pin-publisher');

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
