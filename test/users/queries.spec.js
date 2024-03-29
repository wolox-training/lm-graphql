const { query } = require('../server.spec'),
  { getUser, getUsers } = require('./graphql'),
  userFactory = require('../factories/user');

describe('users', () => {
  describe('queries', () => {
    describe('single-user', () => {
      it('should get user properly', () =>
        userFactory.create().then(user =>
          query(getUser(user.id)).then(res => {
            expect(res.data).toEqual({
              user: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                name: `${user.firstName} ${user.lastName}`
              }
            });
          })
        ));

      it('should return null when fetching a non existing user', () =>
        query(getUser(876545678)).then(res => {
          expect(res.data).toBeNull();
        }));
    });

    describe('multi-user', () => {
      it('should get all users', () =>
        userFactory.createMany(5).then(() =>
          query(getUsers()).then(res => {
            expect(res.data.users).toHaveLength(5);
            for (let i = 0; i < 5; i++) {
              expect(res.data.users[i].name).toBe(
                `${res.data.users[i].firstName} ${res.data.users[i].lastName}`
              );
            }
          })
        ));

      it('should return an empty array wheren there are no users', () =>
        query(getUsers()).then(res => {
          expect(res.data.users).toEqual([]);
        }));
    });
  });
});
