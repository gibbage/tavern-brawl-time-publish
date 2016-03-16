var Promise = require('promise');
var fetchJson = require('./s3-json-fetcher');
var BrawlScheduler = require('./brawl-scheduler');
var generatePin = require('./pin-generator');
var publishPin = require('./pin-publisher');

exports.handler = function (event, context) {
  Promise.all([
    fetchJson('tavern-brawl-time-config', 'config.json'),
    fetchJson('tavern-brawl-time', 'current.json'),
    fetchJson('tavern-brawl-time', 'next.json')
  ])
  .then(function (resolvedValues) {
    var config = resolvedValues[0];
    var brawlData = resolvedValues[1];
    var nextBrawlId = resolvedValues[2].id;

    var allPinRequests = [];
    BrawlScheduler.REGIONS.forEach(function (region) {
      var scheduler = new BrawlScheduler(region);
      var pin = generatePin(scheduler.brawlStillActive(), scheduler.nextEvent(),
                            brawlData, nextBrawlId);

      allPinRequests.push(
          publishPin(config.timelineApiKey, region, pin)
      );
    });
    return Promise.all(allPinRequests);
  })
  .then(function () {
    context.succeed('Job\'s dun!');
  })
  .catch(function (err) {
    context.fail(err);
  });
};
