const debug = require('debug')('cron-jobs');
const createWorker = require('../shared/bull/create-worker');
const processDailyDigestEmail = require('./queues/digest');
const processSingleDigestEmail = require('./queues/send-daily-digest-email');

const {
  PROCESS_DAILY_DIGEST_EMAIL,
  PROCESS_INDIVIDUAL_DIGEST,
} = require('./queues/constants');

const { dailyDigest } = require('./jobs');

const PORT = parseInt(process.env.PORT, 10) || 3004;

debug('\n Scheduled worker has started');

const server = createWorker(
  {
    [PROCESS_DAILY_DIGEST_EMAIL]: processDailyDigestEmail,
    [PROCESS_INDIVIDUAL_DIGEST]: processSingleDigestEmail,
  },
  {
    settings: {
      lockDuration: 600000, // Key expiration time for job locks.
      stalledInterval: 0, // How often check for stalled jobs (use 0 for never checking).
      maxStalledCount: 0, // Max amount of times a stalled job will be re-processed.
    },
  },
);

// start the jobs
dailyDigest();

server.listen(PORT, 'localhost', () => {
  console.log(
    `Healthcheck server running at ${server.address().address}:${
      server.address().port
    }`,
  );
});
