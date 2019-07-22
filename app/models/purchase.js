const { dbError } = require('../errors');

module.exports = (sequelize, DataTypes) => {
  const Purchase = sequelize.define(
    'purchase',
    {
      albumId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      paranoid: true,
      underscored: true
    }
  );

  Purchase.createPurchase = (albumId, userId) =>
    Purchase.findOrCreate({ where: { albumId, userId }, default: {} }).catch(error => {
      throw dbError(error.message);
    });
  return Purchase;
};
