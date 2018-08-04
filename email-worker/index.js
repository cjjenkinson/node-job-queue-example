const debug = require('debug')('email-worker');
const createWorker = require('../shared/bull/create-worker');

const processSendUserWelcomeEmail = require('./queues/send-user-welcome-email');
const processSendNewPostEmail = require('./queues/send-new-post-email');
const processSendDigestEmail = require('./queues/send-digest-email');

const {
  SEND_NEW_USER_WELCOME_EMAIL,
  SEND_NEW_POST_EMAIL,
  SEND_DIGEST_EMAIL,
} = require('./queues/constants');

const PORT = process.env.PORT || 3002;

debug('Email worker has started, ready to receive jobs');

const server = createWorker({
  [SEND_NEW_USER_WELCOME_EMAIL]: processSendUserWelcomeEmail,
  [SEND_NEW_POST_EMAIL]: processSendNewPostEmail,
  [SEND_DIGEST_EMAIL]: processSendDigestEmail,
});

server.listen(PORT, 'localhost', () => {
  debug(
    `Healthcheck server running at ${server.address().address}:${
      server.address().port
    }`,
  );
});
