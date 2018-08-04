// Create a worker with bull
const debug = require('debug')('bull');
const http = require('http');
const EventEmitter = require('events');
const createQueue = require('./create-queue');

const sumArr = (input, prop) =>
  input.reduce((sum, item) => sum + item[prop], 0);

const createWorker = (queueMap, queueOptions) => {
  // We add one error listener per queue, so we have to set the max listeners
  // to whatever it is set to + the amount of queues passed in
  EventEmitter.defaultMaxListeners =
    Object.keys(queueMap).length + EventEmitter.defaultMaxListeners;

  // Start processing the queues
  const queues = Object.keys(queueMap).map(name => {
    const queue = createQueue(name, queueOptions);
    debug(`Processing: ${name} queue`);
    queue.process(queueMap[name]);
    return queue;
  });

  // Return the job count when requesting anything via HTTP
  return http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    // Summarize the data across all the queues
    Promise.all(queues.map(queue => queue.getJobCounts())).then(jobCounts => {
      const data = {
        waiting: sumArr(jobCounts, 'waiting'),
        active: sumArr(jobCounts, 'active'),
        completed: sumArr(jobCounts, 'completed'),
        failed: sumArr(jobCounts, 'failed'),
        delayed: sumArr(jobCounts, 'delayed'),
      };

      res.end(JSON.stringify(data, null, 2));
    });
  });
};

module.exports = createWorker;
