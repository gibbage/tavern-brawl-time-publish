function generatePin(isActive, timestamp, currentBrawlData) {
  var id = isActive ?
    'brawl-end-' + currentBrawlData.id :
    'brawl-start-' + (currentBrawlData.id + 1);
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

  // TODO: I might not have updated this to the latest yest
  if (isActive && currentBrawlData.name) {
    pin.layout.subtitle = currentBrawlData.name;
  }

  return pin;
}

module.exports = generatePin;
