const debug = require('debug')('api');

const {
  sendNewUserWelcomeEmailQueue,
  sendNewPostEmailQueue,
} = require('../shared/bull/queues');

debug('Fake API Running...');

const user = {
  username: 'cjjenkinson',
  email: 'camjenkinson@gmail.com',
};

// new user welcome
setInterval(() => {
  sendNewUserWelcomeEmailQueue.add({ user });
  debug('New user welcome email sent to: ', user.email);
}, 5000);

// new post email
setInterval(() => {
  sendNewPostEmailQueue.add({ user });
  debug('New post email sent to: ', user.email);
}, 5000);

// user setting reminder to post
