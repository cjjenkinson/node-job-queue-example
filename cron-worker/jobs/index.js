const { createJob } = require('./utils');
const { PROCESS_DAILY_DIGEST_EMAIL } = require('../queues/constants');

const dailyDigest = () =>
  createJob(
    PROCESS_DAILY_DIGEST_EMAIL,
    '0 18 * * *', // run at 6pm every day
    // '* * * * *',
    'daily',
  );

module.exports = {
  dailyDigest,
};
