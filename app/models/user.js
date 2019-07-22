const { dbError } = require('../errors');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      paranoid: true,
      underscored: true
    }
  );

  User.createModel = user => User.create(user);

  User.getOne = user => User.findOne({ where: user });

  User.getAll = () => User.findAll();

  User.getByUsername = username => User.getOne({ username });

  User.getByEmail = email => User.findOne({ where: { email } });

  User.prototype.updateModel = props => this.update(props);

  User.createUser = user =>
    User.findOrCreate({
      where: { email: user.email },

      defaults: {
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password
      }
    }).catch(error => {
      throw dbError(error.message);
    });

  return User;
};
