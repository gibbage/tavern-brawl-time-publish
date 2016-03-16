var assert = require('assert');
var moment = require('moment');
var generatePin = require('../src/pin-generator');

describe('generatePin', function() {
  var someTime, currentBrawlData, nextBrawlId;
  beforeEach(function () {
    someTime = moment('2016-02-11T09:06:00.000Z');
    currentBrawlData = {
      id: 40,
      name: "Peon Smasher 5000",
      quote: "Interesting details"
    };
    nextBrawlId = 41;
  });

  describe('when brawl is active', function () {
    var pin;
    beforeEach(function () {
      pin = generatePin(true, someTime, currentBrawlData, nextBrawlId);
    });

    it('generates a pin with the current id', function () {
      assert.equal(pin.id, 'brawl-end-40');
    });

    it('generates a pin with the "end" title', function () {
      assert.equal(pin.layout.title, "Tavern Brawl Ends");
    });

    it('generates a pin with the ISO timestamp', function () {
      assert.equal(pin.time, '2016-02-11T09:06:00.000Z');
    });

    // it('generates a pin with a subtitle of the current Brawl', function () {
    //   assert.equal(pin.layout.subtitle, 'Peon Smasher 5000');
    // });
  });

  describe('when brawl is over', function () {
    var pin;
    beforeEach(function () {
      pin = generatePin(false, someTime, currentBrawlData, nextBrawlId);
    });

    it('generates a pin with the next brawl id', function () {
      assert.equal(pin.id, 'brawl-start-41');
    });

    it('generates a pin with the "start" title', function () {
      assert.equal(pin.layout.title, "It's Tavern Brawl Time");
    });

    it('generates a pin with the ISO timestamp', function () {
      assert.equal(pin.time, '2016-02-11T09:06:00.000Z');
    });

    it('does not set the subtitle', function () {
      assert.equal(pin.layout.subtitle, undefined);
    });
  });
});
