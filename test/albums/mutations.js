const { mutate } = require('../server.spec'),
  { buyAlbum } = require('./graphql'),
  { login } = require('../users/graphql'),
  { hashPassword } = require('../../app/helpers/hasher'),
  userFactory = require('../factories/user'),
  correctEmail = 'useremail@wolox.com.ar',
  correctPassword = 'password',
  invalidToken = 'invalidToken',
  albumId = 1,
  permissionErrorStatus = 401;

describe('albums', () => {
  describe('mutations', () => {
    it.each([{ token: '' }, { token: invalidToken }])('Test null and invalid token', header =>
      mutate(buyAlbum({ albumId }, header.token)).then(res => {
        expect(res.errors.length).toBe(1);
        expect(res.errors[0].extensions.code).toBe(permissionErrorStatus);
      })
    );

    it('Buy album correctly', () =>
      hashPassword(correctPassword)
        .then(hashedPassword => userFactory.create({ email: correctEmail, password: hashedPassword }))
        .then(() => mutate(login({ email: correctEmail, password: correctPassword })))
        .then(res => mutate(buyAlbum({ albumId }, res.data.login.accessToken)))
        .then(res => {
          console.log(res);
        }));

    test.todo('Buy non-existent album');
    test.todo('Buy album correctly');
  });
});
