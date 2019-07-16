const { mutate } = require('../server.spec'),
  { createUser } = require('./graphql'),
  { comparePasswords } = require('../../app/helpers/hasher'),
  userFactory = require('../factories/user');

describe('users', () => {
  describe('mutations', () => {
    it('should create an user successfuly', () =>
      userFactory.attributes().then(user =>
        mutate(createUser(user)).then(res => {
          const { firstName, lastName, email, password, id } = res.data.createUser;
          expect(firstName).toEqual(user.firstName);
          expect(lastName).toEqual(user.lastName);
          expect(email).toEqual(user.email);
          expect(id).toBeDefined();
          return comparePasswords(user.password, password).then(result => {
            console.log(result);
            expect(result).toBe(true);
          });
        })
      ));
  });
});
