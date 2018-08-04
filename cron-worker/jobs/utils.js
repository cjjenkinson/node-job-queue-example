const createQueue = require('../../shared/bull/create-queue');

const addQueue = (name, data, opts) => {
  const worker = createQueue(name);

  return worker.add({ ...data }, { ...opts });
};

const createJob = (
  name, // name of the queue the cron job should trigger
  pattern, // cron pattern
) => {
  try {
    console.log(`New cron job initiated: ${name}`);
    return addQueue(name, {
      removeOnComplete: true,
      removeOnFail: true,
      attempts: 1,
      repeat: { cron: pattern, tz: 'Europe/London' },
    });
  } catch (err) {
    console.log(`Error processing cron job:\n${err}`);
  }
};

module.exports = {
  addQueue,
  createJob,
};
