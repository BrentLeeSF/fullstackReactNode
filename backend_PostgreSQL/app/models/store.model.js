
module.exports = (sequelize, Sequelize) => {
  const Store = sequelize.define("store", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    license: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false
    },
    suite: {
      type: Sequelize.STRING
    },
    city: {
      type: Sequelize.STRING,
      allowNull: false
    },
    state: {
      type: Sequelize.STRING,
      allowNull: false
    },
    county: {
      type: Sequelize.STRING,
      allowNull: false
    },
    zip: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false
    },
    sales: {
      type: Sequelize.ARRAY(Sequelize.TEXT)
    }
  });
  return Store;
};

