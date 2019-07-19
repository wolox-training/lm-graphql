const { mutate } = require('../server.spec'),
  { createUser } = require('./graphql'),
  { comparePasswords } = require('../../app/helpers/hasher'),
  validationErrorStatus = 401,
  correctFirstName = 'fn',
  correctLastName = 'ln',
  correctEmail = 'email@wolox.com.ar',
  correctPassword = 'password',
  gmailEmail = 'email@gmail.com',
  shortPassword = 'pass',
  passwordWithDots = 'p.a.s.s.w.o.r.d';

const testErrorResponse = response => {
  expect(typeof response.errors).toBe('object');
  expect(response.errors).toHaveLength(1);
};

describe('users', () => {
  describe('mutations', () => {
    describe('signup', () => {
      const user = {
        firstName: correctFirstName,
        lastName: correctLastName,
        email: correctEmail,
        password: correctPassword
      };

      it('should create an user successfuly', () =>
        mutate(createUser(user)).then(res => {
          const { firstName, lastName, email, password, id } = res.data.createUser;
          expect(firstName).toEqual(user.firstName);
          expect(lastName).toEqual(user.lastName);
          expect(email).toEqual(user.email);
          expect(id).toBeDefined();
          return comparePasswords(user.password, password).then(result => {
            expect(result).toBe(true);
          });
        }));

      it('Create user with existing email', () =>
        mutate(createUser(user))
          .then(() => mutate(createUser(user)))
          .then(res => {
            testErrorResponse(res);
            expect(res.errors[0].extensions.code).toBe(validationErrorStatus);
          }));

      it.each([
        { firstName: user.firstName, lastName: user.lastName, email: gmailEmail, password: user.password },
        { firstName: user.firstName, lastName: user.lastName, email: user.email, password: shortPassword },
        { firstName: user.firstName, lastName: user.lastName, email: user.email, password: passwordWithDots }
      ])('Create user with invalid parameters', userData =>
        mutate(createUser(userData)).then(res => {
          testErrorResponse(res);
          expect(res.errors[0].extensions.code).toBe(validationErrorStatus);
        })
      );

      it.each([
        { lastName: user.lastName, email: user.email, password: user.password },
        { firstName: user.firstName, email: user.email, password: user.password },
        { firstName: user.firstName, lastName: user.lastName, password: user.password },
        { firstName: user.firstName, lastName: user.lastName, email: user.email }
      ])('create user with missin parameters', userData =>
        mutate(createUser(userData)).then(res => testErrorResponse(res))
      );
    });
  });
});
