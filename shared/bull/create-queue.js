const Queue = require('bull');
const Redis = require('ioredis');

const client = new Redis();
const subscriber = new Redis();

function createQueue(name, queueOptions) {
  const queue = new Queue(name, {
    createClient(type) {
      switch (type) {
        case 'client':
          return client;
        case 'subscriber':
          return subscriber;
        default:
          return new Redis();
      }
    },
    defaultJobOptions: {
      removeOnComplete: true,
      attempts: 1,
    },
    ...queueOptions,
  });

  queue.on('stalled', job => {
    console.error(`Job#${job.id} stalled processing again.`);
  });

  queue.on('failed', (job, err) => {
    console.error(`Job#${job.id} failed: ${err}`);
  });

  return queue;
}

module.exports = createQueue;
