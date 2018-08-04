const users = [
  {
    username: 'test1',
    email: 'test@test.com',
    notifications: true,
  },
  {
    username: 'test2',
    email: 'test2@test.com',
    notifications: true,
  },
  {
    username: 'test3',
    email: 'test3@test.com',
    notifications: false,
  },
  {
    username: 'test4',
    email: 'test4@test.com',
    notifications: true,
  },
];

const getUsersForDigest = () => users.filter(u => u.notifications);

module.exports = {
  getUsersForDigest,
};
