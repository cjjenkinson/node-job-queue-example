const debug = require('debug')('cron-jobs:queue:process-individual-digest');
const { addQueue } = require('../jobs/utils');
const { SEND_DIGEST_EMAIL } = require('./constants');

module.exports = async job => {
  const { user } = job.data;

  debug('\n Starting a new job to process an individual digest');

  return addQueue(
    SEND_DIGEST_EMAIL,
    {
      ...user,
    },
    {
      removeOnComplete: true,
      removeOnFail: true,
    },
  )
    .then(() => debug('\n Sent a daily digest'))
    .catch(err => {
      debug('Error in job:\n');
      debug(err);
    });
};
