// import sendEmail from '../send-email';
// import { SEND_NEW_USER_WELCOME_EMAIL } from './constants';

const debug = require('debug')('email-worker:queue:send-new-post-email');

module.exports = job => {
  debug(`\nnew job: ${job.id}`);
  const { user } = job.data;

  if (!user.email) {
    debug('user does not have an email, aborting');
    return Promise.resolve();
  }

  console.log(`Sending new post email to ${user.email}`);

  // try {
  //   return sendEmail({
  //     TemplateId: NEW_USER_WELCOME_TEMPLATE,
  //     To: user.email,
  //     Tag: SEND_NEW_USER_WELCOME_EMAIL,
  //     TemplateModel: {
  //       user,
  //     },
  //   });
  // } catch (err) {
  //   debug('Error in job:\n');
  //   debug(err);
  // }
};
