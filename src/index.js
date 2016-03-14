var Promise = require('promise');
var fetchJson = require('./s3-json-fetcher');
var BrawlScheduler = require('./brawl-scheduler');
var generatePin = require('./pin-generator');
var publishPin = require('./pin-publisher');

exports.handler = function (event, context) {
  Promise.all([
    fetchJson('tavern-brawl-time-config', 'config.json'),
    fetchJson('tavern-brawl-time', 'current.json')
  ])
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
