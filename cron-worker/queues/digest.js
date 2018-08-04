// @flow
const debug = require('debug')('cron-jobs:queue:send-digest-email');
const { addQueue } = require('../jobs/utils');
const { PROCESS_INDIVIDUAL_DIGEST } = require('../queues/constants');
const { getUsersForDigest } = require('../models/User');

module.exports = async job => {
  debug(`\nnew job: ${job.id}`);

  // Get all users for a daily digest
  const users = await getUsersForDigest();

  if (!users || users.length === 0) {
    debug('\n No users who want this digest');
    return;
  }

  debug('\n Fetched users who want this digest');

  const usersPromises = users.map(user => {
    try {
      return addQueue(
        PROCESS_INDIVIDUAL_DIGEST,
        { user },
        {
          removeOnComplete: true,
          removeOnFail: true,
        },
      );
    } catch (err) {
      debug(err);
    }
  });

  debug('\n Created individual jobs for each users digest');
  try {
    return Promise.all(usersPromises);
  } catch (err) {
    debug(' Error in job:\n');
    debug(err);
  }
};
