const { factory } = require('factory-girl'),
  faker = require('faker'),
  models = require('../../app/models'),
  { alphanumericRegex } = require('../../app/helpers/constants'),
  { user: User } = models;

factory.define('user', User, {
  firstName: () => faker.name.firstName(),
  lastName: () => faker.name.lastName(),
  email: () => `${faker.name.lastName()}@wolox.com.ar`,
  password: () => faker.internet.password(8, false, alphanumericRegex)
});

module.exports = {
  create: params => factory.create('user', params),
  createMany: () => factory.createMany('user', 5),
  build: params => factory.build('user', params),
  attributes: params => factory.attrs('user', params)
};
