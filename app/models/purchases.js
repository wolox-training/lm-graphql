'use strict';
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
  /* purchases.associate = function(models) {
    // associations can be defined here
  };*/
  return Purchase;
};
