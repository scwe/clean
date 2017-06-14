
var action = {
  CONNECT: 0,
  ANNOUNCE: 1,
  SCRAPE: 2,
  ERROR: 3
}

var event = {
  NONE: 0,
  COMPLETED: 1,
  STARTED: 2,
  STOPPED: 3
}

module.exports = {
  event,
  action
}
