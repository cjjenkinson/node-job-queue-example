const EventEmitter = require('events');
const createQueue = require('./create-queue.js');

const {
  SEND_NEW_USER_WELCOME_EMAIL,
  SEND_NEW_POST_EMAIL,
} = require('../../email-worker/queues/constants');

// Normalize queue names to a set of JS compatible names
exports.QUEUE_NAMES = {
  sendNewUserWelcomeEmailQueue: SEND_NEW_USER_WELCOME_EMAIL,
  sendNewPostEmailQueue: SEND_NEW_POST_EMAIL,
};

// We add one error listener per queue
EventEmitter.defaultMaxListeners =
  Object.keys(exports.QUEUE_NAMES).length + EventEmitter.defaultMaxListeners;

// Create all the queues, export an object with all the queues
const queues = Object.keys(exports.QUEUE_NAMES).reduce((queues, name) => {
  queues[name] = createQueue(exports.QUEUE_NAMES[name]);
  return queues;
}, {});

module.exports = queues;
